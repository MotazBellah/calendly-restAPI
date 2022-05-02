const express = require('express')
const mongoose = require('mongoose');
const Moment = require('moment');
const MomentRange = require('moment-range');
const User = require('./models/user')
const Meeting = require('./models/meeting')
const app = express()

const moment = MomentRange.extendMoment(Moment);

app.use(express.json())

const URI = "mongodb+srv://admin:xLyH3k15Q3M3FFJh@cluster0.tkhkv.mongodb.net/calendly?retryWrites=true&w=majority"
mongoose.connect(URI)


app.post('/api/schedule_meeting',  async function (req, res) {
    const { title, meetingCreator, meetingWith, slotTime, slotDate, duration } = req.body
    let meetingList = [];
    let userList = []
    // 
    const isDate = (date) => {
        return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
      }
    const isTime = moment(slotTime, 'HH:mm', true).isValid()
   
    if(!isDate(slotDate) || moment(slotDate).isBefore(moment(), "day")) {
        return res.json({"error": "The date slot is not correctly"})
    }

    else if(!isTime) {
        return res.json({"error": "The time slot is not correctly"})
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
        const users = [meetingCreator, meetingWith]
        const checkUser = await User.find({username: {$in: users}})
  
        if (checkUser.length === 2) {
            const meetingList = await Meeting.find({$or: [{meetingWith: meetingWith},{meetingCreator: meetingWith}]})
            for (const i in meetingList) {
                
                    const element = meetingList[i];
                    // console.log(element)
                    try {
                        if (element.slotDate == slotDate) {
                            console.log(element.slotTime)
                            const startTime = moment(element.slotTime, 'HH:mm');
                            const value = element.duration
                            const endTime = startTime.add(value, 'minutes').format('HH:mm');
                            
                            const date1 = element.slotDate + " " + element.slotTime
                            const date2 = element.slotDate + " " + endTime

                            var dateRange = [moment(date1), moment(date2)];

                            const startTime2 = moment(slotTime, 'HH:mm');
                            const endTime2 = startTime.add(duration, 'minutes').format('HH:mm');
                            
                            const date12 = slotDate + " " + slotTime
                            const date22 = slotDate + " " + endTime2

                            var dateRange2 = [moment(date12), moment(date22)];
                            
                            // console.log(dateRange)
                            const range1 = moment.range(dateRange);
                            const range2 = moment.range(dateRange2);
                            console.log(range1.overlaps(range2));
                            if (range1.overlaps(range2)){
                                return res.status(200).send({"error": `${meetingWith} is busy, Please select different time slot`});
                            }

                        }
                    } catch (error) {
                        // pass
                    }
               
            }

           
            // console.log(meetingList)
            const schedulMeeting = await meeting.save()
            return res.status(201).json(schedulMeeting);
        } else {
            return res.status(400).send({"error": "User does not exist"});
        }
         
      
    }  
    
})


app.get('/api/view/:username',  async function (req, res) {
    const { username } = req.params
    const meetingList = await Meeting.find({$or: [{meetingWith: username},{meetingCreator: username}]},
            {slotDate: 1, title: 1, slotTime: 1, duration: 1,  _id: 0})
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