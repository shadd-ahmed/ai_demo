from ultralytics import YOLO
import cv2
import random
import numpy as np


# 0: Nose 1: Left Eye 2: Right Eye 3: Left Ear 4: Right Ear 5: Left Shoulder 6: Right Shoulder 7: Left Elbow 8: Right Elbow 9: Left Wrist 10: Right Wrist 11: Left Hip 12: Right Hip 13: Left Knee 14: Right Knee 15: Left Ankle 16: Right Ankle
pairs = [(15, 13), (16, 14),(13, 11),(12, 14),(11, 12),(11, 5),(12, 6),(5, 6),(5, 7),(6, 8),(7, 9),(8, 10),(0, 1),(0, 2),(1, 3),(2, 4)]
last_10_keypoints = []

CONTOURS_LEVELS = {
    1: {
        "blur_kernel_size": 3,
        "laplacian_kernel_size": 3,
        "laplacian_scale": 1.9,
        "laplacian_delta": 20,
    },
    2: {
        "blur_kernel_size": 5,
        "laplacian_kernel_size": 5,
        "laplacian_scale": 1,
        "laplacian_delta": -20,
    },
    3: {
        "blur_kernel_size": 7,
        "laplacian_kernel_size": 5,
        "laplacian_scale": 1,
        "laplacian_delta": -10,
    },
    4: {
        "blur_kernel_size": 11,
        "laplacian_kernel_size": 5,
        "laplacian_scale": 1,
        "laplacian_delta": 0,
    },
    5: {
        "blur_kernel_size": 17,
        "laplacian_kernel_size": 5,
        "laplacian_scale": 1.2,
        "laplacian_delta": 10,
    },
}

COLORS = [
    (255, 0, 0),     # Red
    (0, 255, 0),     # Green
    (0, 0, 255),     # Blue
    (255, 255, 0),   # Yellow
    (255, 0, 255),   # Magenta
    (0, 255, 255),   # Cyan
    (128, 0, 0),     # Maroon
    (128, 128, 0),   # Olive
    (0, 128, 0),     # Dark Green
    (128, 0, 128),   # Purple
    (0, 128, 128),   # Teal
    (0, 0, 128),     # Navy
    (192, 192, 192), # Silver
    (128, 128, 128), # Gray
    (255, 165, 0),   # Orange
]

model_pose = YOLO('yolo11n-pose.pt')
model_seg = YOLO('yolo11n-seg.pt')
model_det = YOLO('yolo11n.pt')

def add_kpts(frame, kpts):
    for kpt in kpts: # for every detection 
        color = (random.randint(100, 255), random.randint(100, 255), random.randint(100, 255)) # generate a random color 

        keypoints = kpt.xy[0].cpu().numpy().astype(int) # get keypoints for that detection
        for (x, y) in keypoints:
            cv2.circle(frame, ((x), (y)), radius=4, color=color, thickness=-1)  # Green circles
        for p in pairs:
            point1 = (keypoints[p[0]])
            point2 = (keypoints[p[1]])
            if point1 is None or point2 is None or \
                        point1[0] < 1 and point1[1] < 1 or \
                        point2[0] < 1 and point2[1] < 1:
                continue
            cv2.line(frame, point1, point2, color=color, thickness=2)  # Draw a line between the points
    return frame

def bounding_box(frame):
    result = model_det(frame)
    return result[0].plot()

def track_left(frame):
    return track(frame, 10)
def track_right(frame):
    return track(frame, 9)
def track_nose(frame):
    return track(frame, 0)

def track(frame, idx):
    frame = np.fliplr(np.array(frame)) # reflect it to make sure we are tracking the right part. 
    col_mask = np.zeros((frame.shape[0], frame.shape[1], 3), dtype=np.uint8) # blank colored mask
    results = model_pose(frame)

    if results[0].keypoints[0].xy.shape[1]: # in case of no detections 
        temp = results[0].keypoints[0].xy[0].cpu().numpy().astype(int)[idx]
        if temp[0] != 0 or temp[1] != 0: # see if still needed
            last_10_keypoints.append(temp)
        
        if len(last_10_keypoints) > 10:
            last_10_keypoints.pop(0)
        
        for i in range(1, len(last_10_keypoints)):
            pt1 = last_10_keypoints[i-1]
            pt2 = last_10_keypoints[i]
            color = (random.randint(100, 255), random.randint(100, 255), random.randint(100, 255))
            cv2.line(col_mask, pt1, pt2, color, 2)  # Green line with thickness 2
    
    return col_mask

def mask_blur_pose(frame):
    pose = model_pose(frame) # we will use pose coord from this 
    frame = mask_blur(frame)
    if pose[0].keypoints[0].xy.shape[1]:
        return add_kpts(frame, pose[0].keypoints)    
    return frame 

def mask_color_pose(frame):
    pose = model_pose(frame) # we will use pose coord from this 
    frame = mask_color(frame)
    if pose[0].keypoints[0].xy.shape[1]:
        return add_kpts(frame, pose[0].keypoints)   
    return frame 

def mask_blur(frame):
    results = model_seg(frame)    
    if results[0].masks:
        masks = results[0].masks.xy # get masks for frame
        mask = np.zeros((frame.shape[0], frame.shape[1]), dtype=np.uint8) # blank colored mask
        for m in masks: # for every detection 
            points = m.astype(int) # convert coord to int
            points = points.reshape((1, len(points), 2)) # reshape to fit cv2 func arguments 
            cv2.fillPoly(mask, points, color=255) # fill the mask with points
        
        inverted_mask = cv2.bitwise_not(mask)

        blurred_frame = cv2.GaussianBlur(frame, (33, 33), 0)  
        frame_without_mask = cv2.bitwise_and(frame, frame, mask=inverted_mask)
        blurred_part = cv2.bitwise_and(blurred_frame, blurred_frame, mask=mask)
        frame = cv2.add(frame_without_mask, blurred_part)
   
    return frame

def mask_color(frame):
    results = model_seg(frame)    
    if results[0].masks:
        masks = results[0].masks.xy # get masks for frame
        mask = np.zeros((frame.shape[0], frame.shape[1]), dtype=np.uint8) # blank colored mask
        for m in masks: # for every detection 
            points = m.astype(int) # convert coord to int
            points = points.reshape((1, len(points), 2)) # reshape to fit cv2 func arguments 
            cv2.fillPoly(mask, points, color=255) # fill the mask 
        
        inverted_mask = cv2.bitwise_not(mask)
        frame = cv2.bitwise_and(frame, frame, mask=inverted_mask)
   
    return frame

def segmentation(frame):
    results = model_seg(frame)    
    if results[0].masks:
        masks = results[0].masks.xy # get masks for frame
        col_mask = np.zeros((frame.shape[0], frame.shape[1], 3), dtype=np.uint8) # blank colored mask
        for m in masks: # for every detection 
            points = m.astype(int) # convert coord to int
            points = points.reshape((1, len(points), 2)) # reshape to fit cv2 func arguments 
            color = (random.randint(100, 255), random.randint(100, 255), random.randint(100, 255)) # generate random color for the mask 
            cv2.fillPoly(col_mask, points, color=color) # fill the mask 
            
        frame = cv2.addWeighted(frame, 1, col_mask, 0.5, 0)

    return frame

def pose(frame):
    results = model_pose(frame)
    if results[0].keypoints[0].xy.shape[1]:
        return add_kpts(frame, results[0].keypoints)
    return frame

def pose_black(frame):
    canvas = np.zeros(frame.shape)
    results = model_pose(frame)
    if results[0].keypoints[0].xy.shape[1]:
        return add_kpts(canvas, results[0].keypoints)
    return canvas

def outline_black(frame):
    canvas = np.zeros(frame.shape)
    results = model_seg(frame)    
    if results[0].masks:
        masks = results[0].masks.xy # get masks for frame
        binary_mask = np.zeros((frame.shape[0], frame.shape[1]), dtype=np.uint8)  # Blank binary mask
        for m in masks: # for every detection 
            points = m.astype(int) # convert coord to int
            points = points.reshape((1, len(points), 2)) # reshape to fit cv2 func arguments 
            cv2.fillPoly(binary_mask, points, color=1)  # 1 indicates inside the polygon
            contours, _ = cv2.findContours(binary_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            color = (random.randint(100, 255), random.randint(100, 255), random.randint(100, 255))
            cv2.drawContours(canvas, contours, -1, color, 2)  # Green contours with thickness 2

    return canvas

def outline(frame):
    results = model_seg(frame)    
    if results[0].masks:
        masks = results[0].masks.xy # get masks for frame
        binary_mask = np.zeros((frame.shape[0], frame.shape[1]), dtype=np.uint8)  # Blank binary mask
        for m in masks: # for every detection 
            points = m.astype(int) # convert coord to int
            points = points.reshape((1, len(points), 2)) # reshape to fit cv2 func arguments 
            cv2.fillPoly(binary_mask, points, color=1)  # 1 indicates inside the polygon
            contours, _ = cv2.findContours(binary_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            color = (random.randint(100, 255), random.randint(100, 255), random.randint(100, 255))
            cv2.drawContours(frame, contours, -1, color, 2)  # Green contours with thickness 2

    return frame

def raw(frame):
    return frame