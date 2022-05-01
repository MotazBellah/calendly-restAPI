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
console.log(meetingCreator)
    const meeting = new Meeting({
        title: title,
        meetingCreator: meetingCreator,
        meetingWith: meetingWith,
        slotTime: slotTime,
        slotDate: slotDate,
        duration: duration,
    });

    meeting.save()
    .then((result) =>{
        // console.log(result)
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })
})


app.listen(3000)