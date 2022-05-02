# Calendly-like RESTAPI

REST APIs for a simple Calendly-like application that lets a user schedule a meeting with another user.
the APIs do the following:
- A user can schedule a meeting with another user if they are free at that date and time
- A user can view another user’s meetings to see when they are free

## DB setup

Use cloud mongoDB on atlas (https://www.mongodb.com/cloud/atlas/)

## Project Folder/Files

- index.js: The main application file
- tools.js: Contain some fuction to be used in the index file (functions to validate the data)
- models: Folder contains the monogodb models(meeting, user)
- test: Folder contain the test files to test the post and get requests 

Use cloud mongoDB on atlas (https://www.mongodb.com/cloud/atlas/)

## Project setup
```
git clone https://github.com/MotazBellah/calendly-restAPI.git
cd calendly-restAPI
```
```
npm install
```

### Run the application
```
npm run start
```

### Run the test
```
npm run test
```
