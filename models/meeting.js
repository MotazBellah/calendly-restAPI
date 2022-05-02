const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const meetingSchema = new Schema({
  title: {
    type: String,
   
  },
  meetingCreator: {
    type: String,
    
  },
  meetingWith: {
    type: String,
  
  },
  duration: {
    type: String,
   
    default: "30"
  },
  slotTime: { 
     type: String,
   },
  slotDate: { 
      type: String,
      
    },
}, { timestamps: true });

const meeting = mongoose.model('meeting', meetingSchema);
module.exports = meeting