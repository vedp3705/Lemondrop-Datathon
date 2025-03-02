# Fire Size Predictor and Safety Guide

### This is a web app in which a user can report an instance of a fire. Based on the the location, month, year, and cause of the fire, we predict the class of the fire from 1.8 million historical data points. Addtionally, the program uses an LLM to provide advice on how to deal with the fire, such as nearby fire departments, vulnerable facilities, and resource management.

## Instructions for setup:
## Backend Setup (Python)

1. **Create a Virtual Environment, install dependencies, and start running backend**  
   Run the following command to create a virtual environment named `venv`:
   ```bash
   - python3 -m venv venv
   - source venv/bin/activate
   - pip install -r requirements.txt
   - python3 app.py

## Frontend Setup (Javacript) 
- instantiate a new terminal
- npm install
- run "npm start"


## Tech Stack
- **Frontend**: React (web app), CSS
- **Backend**: Python, Flask
- **Model Training** Tensorflow, Keras
- **Location Services**: Geopy (coordinates <-> county), Leaflet (interactive map)
- **LLM**: Groq, LLama3

  
| Member        | GitHub id    |
| :-----------: | :----------: |
| Nilay Kundu | nilay-kundu |
| Ved Patil | vedp3705 |
| Piyush Jadhav | PiyushJadhav |
| Aneesh Agarwal | aneeshtheplug|
