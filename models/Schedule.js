const{Schema, model} = require('mongoose')

const ScheduleSchema = new Schema({
    name: {
      type: String,
      required: [true, "Please Include your name"]
    },
    startTime:{
      type : Date,
      required : true,
    },
    endTime:{
        type: Date,
        required : true,
    }
  })

const Schedule = model("Schedule", ScheduleSchema);

module.exports = Schedule;