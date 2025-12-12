## Demo
[![Watch Demo Video 1]()](demo_1.mp4)

[![Watch Demo Video 2]()](demo_2.mp4)

## Installation 

Assuming you have the following installed:  
> [GitHub](https://desktop.github.com/download/)  
> [Visual Studio Code](https://code.visualstudio.com/download)  
> [Anaconda/ Miniconda](https://www.anaconda.com/download)  
> [Node](https://nodejs.org/en/download)  

Clone Repository: ```git clone https://github.com/shadd-ahmed/ai_demo.git```
> Open the cloned folder on VS Code

### Frontend 
> Open a dedicated terminal  
```
npm i   
npm run dev 
```
This should install frontend dependencies and run the code.  
You can open ```localhost:3000``` on a browser.

### Backend  
> Open an Anaconda terminal  
> Navigate to your directory 
```
cd backend
conda create -n CHOSEN_NAME python==3.10.0 ipython pip 
conda activate CHOSEN_NAME  
pip install -r requirements.txt
python backend_cam.py 
```

>Once done with demo:  
```
conda deactivate
``` 

## Changing Camera
> Go to backend/backend_cam.py  
> in get_frame function   
> change the index from 0 to your device index (Ex: 1)
```
cap = cv2.VideoCapture(0)
```
