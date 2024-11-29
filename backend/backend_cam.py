from flask import Flask, request, jsonify, send_file, Response
import io
import base64
from flask_cors import CORS
import cv2
import numpy as np
from ultralytics import YOLO
from utils import *

app = Flask(__name__)
CORS(app)  # Enable CORS if needed

model_det = YOLO('yolo11n.pt')

current_mode = "raw"  # Default to raw feed

modes = [
'Raw Feed',
'Bounding Box',
'Segmentation',
'Pose',
'Pose with Black Background',
'Tracking',
'Outline',
'Outline with Black Background',
'Masking', 
'Masking with Black Filling', 
'Masking with Blurring',
'Pose + Masking',
'Pose + Masking with Black Filling',
'Pose + Masking with Blurring'
]

# funcs = [segmentation]

@app.route('/set_mode', methods=['POST'])
def set_mode():
    global current_mode
    mode = request.json.get('mode')['txt']
    print(mode)
    if mode in modes:
        current_mode = mode
        return {'message': f'Mode switched to {mode}'}, 200
    return {'error': 'Invalid mode'}, 400


def get_frame():
    cap = cv2.VideoCapture(1)  # Video source (webcam or video file) ...
    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            print('issue')
            break

        if current_mode == "Pose + Masking with Black Filling":
            frame = mask_color_pose(frame)
        elif current_mode == "Pose + Masking with Blurring":
            frame = mask_blur_pose(frame)
        elif current_mode == "Masking with Blurring":
            frame = mask_blur(frame)
        elif current_mode == 'Masking with Black Filling':
            frame = mask_color(frame)
        elif current_mode == "Pose":
            frame = pose(frame)
        elif current_mode == "Pose with Black Background":
            frame = pose_black(frame)
        elif current_mode == "Segmentation":
            frame = segmentation(frame)
        elif current_mode == 'Outline':
            frame = outline(frame)
        elif current_mode == 'Outline with Black Background':
            frame = outline_black(frame)
        elif current_mode == "Tracking":
            frame = np.fliplr(np.array(frame))
            frame = track(frame)
        elif current_mode == 'Bounding Box':
            result = model_det(frame)
            frame = result[0].plot()

        ret, buffer = cv2.imencode('.jpg', frame)
        if not ret:
            return jsonify({'error': 'Failed to encode image'}), 500
        frame = buffer.tobytes()
       
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/get_frame')
def video_feed():
    return Response(get_frame(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)
