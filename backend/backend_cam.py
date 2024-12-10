from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import cv2
from utils import *

app = Flask(__name__)
CORS(app)  # Enable CORS if needed


current_mode = '0'  # Default to raw feed

options = {'0':raw , '1': bounding_box, '2':segmentation, '3': pose, '30': pose_black, '40':track_left, '41':track_right, '42':track_nose,   '5': outline, '50': outline_black , '60':mask_color , '61':mask_blur , '70':mask_color_pose , '71':mask_blur_pose}

@app.route('/set_mode', methods=['POST'])
def set_mode():
    global current_mode
    mode = request.json.get('mode')
    key, opt_key = mode['key'], mode['opt_key'] 
    if opt_key != None:
        key = key + opt_key
    print(key, opt_key)
    if key in options.keys():
        current_mode = key
        return {'message': f'Mode switched to {current_mode}'}, 200
    return {'error': 'Invalid mode'}, 400


def get_frame():
    cap = cv2.VideoCapture(0)  # Video source (webcam or video file) ...
    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            print('issue')
            break

        frame = options[current_mode](frame)
    
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
    app.run(debug=True, )
