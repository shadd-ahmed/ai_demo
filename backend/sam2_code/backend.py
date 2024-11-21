from gevent import monkey
monkey.patch_all()

from flask import Flask, jsonify
from flask_socketio import SocketIO
import base64
import cv2
import numpy as np
import logging
from ultralytics import YOLO
from utils import segmentation  # Ensure you import your segmentation function correctly

# Setup logging
logging.basicConfig(level=logging.INFO)

# Initialize Flask and Flask-SocketIO
app = Flask(__name__)
socketio = SocketIO(app, async_mode='gevent', cors_allowed_origins="*")

# Load the YOLO model
model_det = YOLO('yolo11n.pt')

# Default mode for processing
current_mode = "raw"

# Event when client connects
@socketio.on('connect')
def handle_connect():
    logging.info("Client connected")

# Event when client disconnects
@socketio.on('disconnect')
def handle_disconnect():
    logging.info("Client disconnected")

# Event to handle incoming frames from the client
@socketio.on('send_frame')
def handle_frame(data):
    try:
        # Get the Base64 image string from the client
        image_data = data.get('image')
        
        if not image_data:
            logging.error("No image provided")
            return {'error': 'No image provided'}

        # Decode the Base64 string to bytes
        # print('got image', image_data.split(",")[1])

        # Remove the 'data:image/png;base64,' prefix if it exists
        image_data = image_data.split(",")[1] if ',' in image_data else image_data

        try:
            img_bytes = base64.b64decode(image_data)
        except Exception as e:
            print(f"Error decoding Base64: {e}")
            return {'error': 'Failed to decode image'}

        # image_data = image_data.split(",")[1]  # Remove the prefix if present
        # img_bytes = base64.b64decode(image_data)

        # # Convert bytes to OpenCV image
        frame = np.frombuffer(img_bytes, np.uint8)
        frame = cv2.imdecode(frame, cv2.IMREAD_COLOR)

        # # Process the frame based on the current mode
        if current_mode == "segmentation":
            frame = segmentation(frame)  # Ensure segmentation function works as expected

        # Encode the processed frame back to PNG
        frame = np.array(frame)
        success, buffer = cv2.imencode('.png', frame)
        if not success:
        #     logging.error("Failed to encode image")
            return {'error': 'Failed to encode image'}

    # const base64Image = canvas.toDataURL('image/png');

    # // if (socketRef.current && socketRef.current.connected) {
    #   // }
    # socket.emit('send_frame', { image: base64Image});
        # cv2.imshow('hello', buffer)
        # cv2.waitKey(1)
        # # Convert the image to base64
        base64_image = base64.b64encode(buffer).decode('utf-8')

        # # Send the processed image back to the client
        socketio.emit('processed_frame', {'image': f'data:image/png;base64,{base64_image}'})

    except Exception as e:
        logging.error(f"Error processing frame: {e}")

# Start the Flask app with SocketIO support
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
