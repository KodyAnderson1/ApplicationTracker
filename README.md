# ApplicationTracker

## Concept / Project Overview
This is a **full stack** MERN project using React as a front end library and express.js as a backend framework. This project was created as a way to track all the applications I have been, and will continue, to put out for internships and (soon to be) junior development positions. The dashboard styling was a result of a youtube tutorial (still coded all by hand), but most of the backend and the concept itself was done by me. The dashboard is built and styled by Material UI.


## Languages and Libraries
- JavaScript
- React
  - React Redux
  - React Router
- MongoDB
- Express.js
- Material UI
- CSS
- HTML

## Installation Instructions
This repo contains the front and backend both of which need to be initialized separately.

### Starting the Backend
The backend was built with Express.js and is in the `server` folder. It can be installed and run by first creating a `.env` file in the `server` folder with a `MONGO_URL=` connection variable and then typing `npm install` and `npm run dev` in the console to initialize the server via nodemon.

### Starting the frontend
The frontend was built with React and is in the folder `client`. It can be installed and run by creating a `.env.local` file in the `client folder` and adding a variable `REACT_APP_BASE_URL= ...` and then using `npm install` in the console. The react portion was created with create-a-react-app so `npm start` starts the app. 

## Current Development
- [x] Attatch form to state and database
- [ ] Finish Dashboard (Homepage)
  - [ ] Create a Notification Center
  - [x] Create limited statistics on data
  - [x] Implement date logic and remove placeholder values
    - [ ] Logic when status changes to "interview" or "assessment" to ask/track a time/date
    - [ ] Logic to track last status change && if over 7 days, notifies (Started)
      - [ ] Put Link to actual application in Notification Center for ease of change
      - [x] "Needs Attention" widgit have an actual count
- [ ] Implement a form to update existing applications
- [ ] Make data tables more / clearly customizable
- [ ] Include recommended programming stacks in data gathered/displayed
- [ ] Form Validation
  - [ ] Implement React-Hook-Form 
- [ ] Details page for each application with more details
  - [ ]  Programming Stack listed
  - [ ]  If Hybrid or in-person, all locations listed
- [ ] Implement searchbar logic for search in header - Opens up specific application's details page
- [ ] Implement log in/out && users
  - [ ] Create Account Page
  - [ ] Log In Page
- [ ] Implement an easy way of updating status without going to details page


## Future Development
- [ ] Implement an administrator view
- [ ] Implement user settings
  - [ ] Update user information
- [ ] Add a Jobs section that can track current jobs / relevant data

## Misc
[Dashboard tutorial](https://www.youtube.com/watch?v=0cPCMIuDk2I)
