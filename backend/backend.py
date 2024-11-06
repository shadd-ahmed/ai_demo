from flask import Flask, Response, request
# from fastsam import FastSAM, FastSAMPrompt
import cv2
import numpy as np
import torch 
from ultralytics import YOLO


app = Flask(__name__)

# model_sam = FastSAM("FastSAM-x.pt")

model_seg = YOLO('yolo11n-seg.pt')
model_det = YOLO('yolo11n.pt')
model_pose = YOLO('yolo11n-pose.pt')  # load a pretrained YOLO pose model

DEVICE = torch.device(
    "cuda"
    if torch.cuda.is_available()
    else "mps"
    if torch.backends.mps.is_available()
    else "cpu"
)

current_mode = "raw"  # Default to raw feed

@app.route('/set_mode', methods=['POST'])
def set_mode():
    global current_mode
    mode = request.json.get('mode')
    if mode in ["raw", "maskblack", "maskblur", "segmentation", "bounding-box", 'pose', 'sam']:
        current_mode = mode
        return {'message': f'Mode switched to {mode}'}, 200
    return {'error': 'Invalid mode'}, 400

def generate_frames():
    cap = cv2.VideoCapture(0)  # Video source (webcam or video file)
    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            break

        if current_mode == "segmentation":
            result = model_seg.predict(frame, show_labels = False, show_boxes = False, augment=False)
            frame = result[0].plot()

        elif current_mode == 'sam':
            pass
                # everything_results = model_sam(
                #     frame,
                #     device=DEVICE,
                #     retina_masks=True,
                #     imgsz=1024,
                #     conf=0.5,
                #     iou=0.9,
                # )
                # prompt_process = FastSAMPrompt(frame, everything_results, device=DEVICE)
                # ann = prompt_process.everything_prompt()
                # if len(ann) > 0: 
                #     frame = prompt_process.plot_to_result(annotations=ann)

        elif current_mode == "maskblack":
            result = model_det(frame)
            for r in result:
                boxes = r.boxes.xyxy
                for box in boxes:
                    x1, y1, x2, y2 = box  # Convert to integers
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                    
                    cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 0, 0), thickness=cv2.FILLED)
        
        elif current_mode == "maskblur":
            result = model_det(frame)
            for r in result:
                boxes = r.boxes.xyxy
                for box in boxes:
                    x1, y1, x2, y2 = box  # Convert to integers
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

                    roi = frame[y1:y2, x1:x2]
                    # blurred_roi = cv2.blur(roi, (55, 55), 0)  # You can adjust the kernel size
                    blurred_roi = cv2.medianBlur(roi, 55)  # You can adjust the kernel size
                    frame[y1:y2, x1:x2] = blurred_roi

        
        elif current_mode == "bounding-box":
            result = model_det(frame)
            frame = result[0].plot()

        elif current_mode == "pose":
            result = model_pose(frame)
            frame = result[0].plot()
        
        # Encode the frame as JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        # Yield the frame
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
