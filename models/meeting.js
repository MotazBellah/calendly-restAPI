const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const tmeetingSchema = new Schema({
  title: {
    type: String,
    required: true,
  
  },
  meetingCreator: {
    type: String,
    required: true,
  
  },
  meetingWith: {
    type: String,
    required: true,
  
  },
  duration: {
    type: String,
    required: true,
    default: "30"
  },
  slotTime: { 
     type: String,
     required: true,
   },
  slotDate: { 
      type: String,
      required: true,
    },
}, { timestamps: true });

const meeting = mongoose.model('meeting', meetingSchema);
module.exports = meeting