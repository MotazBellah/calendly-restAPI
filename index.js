const express = require('express')
const mongoose = require('mongoose');
const moment  = require('moment')
const User = require('./models/user')
const Meeting = require('./models/meeting')
const app = express()

app.use(express.json())

const URI = "mongodb+srv://admin:xLyH3k15Q3M3FFJh@cluster0.tkhkv.mongodb.net/calendly?retryWrites=true&w=majority"
mongoose.connect(URI)


app.post('/api/schedule_meeting', function (req, res) {
    const { title, meetingCreator, meetingWith, slotTime, slotDate, duration } = req.body
    // 
    const isDate = (date) => {
        return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
      }
    const isTime = moment(slotTime, 'HH:mm', true).isValid()

    if(!isDate(slotDate)) {
        res.json({"error": "The date slot is not correctly"})
    }

    if(!isTime) {
        res.json({"error": "The time slot is not correctly"})
    }

    const meeting = new Meeting({
        title: title,
        meetingCreator: meetingCreator,
        meetingWith: meetingWith,
        slotTime: slotTime,
        slotDate: slotDate,
        duration: duration,
    });
    try {
        meeting.save()
            .then((result) =>{
                // console.log(result)
                res.json(result)
            })
            .catch((err) => {
                console.log(err)
            })
    } catch (error) {
        console.log(error)
        res.json({"error": "Something went wrong"})
    }
    
})


app.listen(3000)