
## Installation 

### Frontend 
>Install all the dependencies  
```
npm i   
npm run dev 
```

### Backend  
>Go to directory  
```
conda create -n CHOSEN_NAME python==3.10.0 ipython pip 
conda activate CHOSEN_NAME  
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install -r requirements.txt
python backend_cam.py 
```

>Once done with demo:  
```
conda deactivate
``` 
