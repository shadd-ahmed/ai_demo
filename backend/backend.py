from flask import Flask, request, jsonify, send_file
from PIL import Image
import io
import base64
from flask_cors import CORS
import cv2
import numpy as np
from ultralytics import YOLO
from utils import pose, segmentation, mask_color, mask_blur, mask_blur_pose, mask_color_pose


app = Flask(__name__)
CORS(app)  # Enable CORS if needed


model_seg = YOLO('yolo11n-seg.pt')
model_det = YOLO('yolo11n.pt')
model_pose = YOLO('yolo11n-pose.pt')  # load a pretrained YOLO pose model

current_mode = "raw"  # Default to raw feed

@app.route('/set_mode', methods=['POST'])
def set_mode():
    global current_mode
    mode = request.json.get('mode')
    if mode in ["raw", "maskblack", "maskblur", "maskblack_pose", "maskblur_pose", "segmentation", "bounding-box", 'pose', 'sam']:
        current_mode = mode
        return {'message': f'Mode switched to {mode}'}, 200
    return {'error': 'Invalid mode'}, 400


@app.route('/process', methods=['POST'])
def process():
    # Get the Base64 image string from the request body
    data = request.get_json()
    image_data = data.get('image')

    if not image_data:
        return jsonify({'error': 'No image provided'}), 400

    # Decode the Base64 string to bytes
    image_data = image_data.split(",")[1]  # Remove the 'data:image/png;base64,' prefix if it's there
    img_bytes = base64.b64decode(image_data)

    # Open the image with PIL
    # frame = Image.open(io.BytesIO(img_bytes))
    frame = np.frombuffer(img_bytes, np.uint8)
    frame = cv2.imdecode(frame, cv2.IMREAD_COLOR)


    if current_mode == "maskblack_pose":
        frame = mask_color_pose(frame)
    elif current_mode == "maskblur_pose":
        frame = mask_blur_pose(frame)
    elif current_mode == "maskblur":
        frame = mask_blur(frame)
    elif current_mode == "maskblack":
        frame = mask_color(frame)
    elif current_mode == "pose":
        frame = pose(frame)
    elif current_mode == "segmentation":
        frame = segmentation(frame)
    
    elif current_mode == "bounding-box":
        result = model_det(frame)
        frame = result[0].plot()

    # Convert NumPy array to an image in PNG format
    frame = np.array(frame)
    ret, buffer = cv2.imencode('.png', frame)

    if not ret:
        return jsonify({'error': 'Failed to encode image'}), 500

    # Convert buffer to a BytesIO object
    img_byte_arr = io.BytesIO(buffer)

    # Send the image as a response
    img_byte_arr.seek(0)  # Go to the start of the BytesIO object
    return send_file(img_byte_arr, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
