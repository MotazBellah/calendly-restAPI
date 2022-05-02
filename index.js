require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose');
const Moment = require('moment');
const MomentRange = require('moment-range');
const User = require('./models/user')
const Meeting = require('./models/meeting')
const tools= require("./tools.js")
const app = express()

const moment = MomentRange.extendMoment(Moment);

app.use(express.json())


const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.tkhkv.mongodb.net/calendly?retryWrites=true&w=majority`
mongoose.connect(URI)


app.post('/api/schedule_meeting',  async function (req, res) {
    // Destructure the body, and get the data
    const { title, meetingCreator, meetingWith, slotTime, slotDate, d } = req.body;
    // Use ternaries, to check if the duration is valid, if not then by default it equal 30 min
    duration = !d ? '30' : !isNaN(d) ? d : '30'

    const isDate = (date) => {
        // Function to check if the data invalid using js Date object
        return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
      }
    //   Check if the time is valid using momentJs
    const isTime = moment(slotTime, 'HH:mm', true).isValid()
   
    if(!tools.isDate(slotDate) || moment(slotDate).isBefore(moment(), "day")) {
        // Make sure the user select date from the future not the past
        // return error to inform the user
        return res.status(400).json({"error": "The date slot is not correctly"})
    }

    else if(!isTime) {
        return res.status(400).json({"error": "The time slot is not correctly"})
    }

    else {

        const meeting = new Meeting({
            title: title,
            meetingCreator: meetingCreator,
            meetingWith: meetingWith,
            slotTime: slotTime,
            slotDate: slotDate,
            duration: duration,
        });
        // List of user (meeting attendees)
        const users = [meetingCreator, meetingWith]
        // Check the user already exsit
        const checkUser = await User.find({username: {$in: users}})
        // If the length is 2, then all attendees are found in our system
        if (checkUser.length === 2) {
            // Before create a new meeting, we list all the user's meeting, 
            // to make sure the time is valid and not overlaping with anhtor meeting
            const meetingList = await Meeting.find({$or: [{meetingWith: meetingWith},{meetingCreator: meetingWith}]})
            for (const i in meetingList) {
                
                    const element = meetingList[i];
                    // if the entered day, already found in the DB, then make sure there is no conflict with other meetings
                    try {
                        if (element.slotDate == slotDate) {
                            // Create time range between start time and end time
                            // Check if the there is a conflict
                            const range1 = tools.getRange(element.slotDate, element.slotTime, element.duration);
                            const range2 = tools.getRange(slotDate, slotTime, duration);
                            
                            if (range1.overlaps(range2)){
                                return res.status(409).send({"error": `${meetingWith} is busy, Please select different time slot`});
                            }

                        }
                    } catch (error) {
                        console.log(error);
                        return res.status(500).send({"error": "Something went wrong, please try again later!"});
                    }
               
            }

           
            // after a successful validation, save the meetion
            const schedulMeeting = await meeting.save()
            return res.status(201).json(schedulMeeting);
        } else {
            // The user list is less than 2, then one of the attendees not registered to the system
            return res.status(404).send({"error": "User does not exist"});
        }
         
      
    }  
    
})


app.get('/api/view/:username',  async function (req, res) {
    // Get the username from the URL
    const { username } = req.params
    // Get the meeting list where the user is the meeting creator or attendee
    // Get only the slotdate, title, slottime and duration
    const meetingList = await Meeting.find({$or: [{meetingWith: username},{meetingCreator: username}]},
            {slotDate: 1, title: 1, slotTime: 1, duration: 1,  _id: 0})
    // If the meetinglist is empty inform the user that, the user has no meeting
    if (meetingList.length > 0) {
        return res.status(200).json(meetingList);
    } else {
        return res.status(200).json({"message": `${username} has no meeting yet`});
    }
    

})


module.exports = app;

app.listen(3000,function(){
    console.log("I am listening at PORT 3000");
  })