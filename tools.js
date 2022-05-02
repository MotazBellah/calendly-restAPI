const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

const isDate = (date) => {
    // Function to check if the data invalid using js Date object
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
  }


const getRange = (date, time, duration) => {
    // Create range of time
    // Create start time and end time
    const startTime = moment(time, 'HH:mm');
    const endTime = startTime.add(duration, 'minutes').format('HH:mm');
    // Formate the date time correctly
    // i.e 2022-06-1 15:00
    const date1 = date + " " + time
    const date2 = date + " " + endTime
    // Create and return the range
    var dateRange = [moment(date1), moment(date2)];
  
    const range = moment.range(dateRange);
    return range;
  
}
  

module.exports ={
    isDate, getRange
}