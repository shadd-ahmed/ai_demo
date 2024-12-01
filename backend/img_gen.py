from utils import *
import cv2 

img = cv2.imread('C:/Users/User/Desktop/final_demo/frontend/public/raw.jpg')
img = mask_color_pose(img)
cv2.imwrite('C:/Users/User/Desktop/final_demo/frontend/public/mask_color_pose.png', img)