const Schedule = require("../models/Schedule");

exports.addSchedule = async (req, res) => {
    try {
      const schedule = new Schedule({
        name: req.body.name,
        startTime: req.body.startTime,
        endTime: req.body.endTime
      });
      let data = await schedule.save();
      res.status(201).json({ data });
    } catch (err) {
      res.status(400).json({err:err});
    }
};

exports.getAllSchedule =  async (req,res)=>{
  try {
      const schedule = await Schedule.find()
      if(!schedule) throw new Error('No user')
      res.status(200).json(schedule)
  } catch (error) {
      res.status(500).json({message : error.message})
  }
};

exports.updateSchedule =  async (req,res)=>{
  const {id} = req.params
  try {
      const response = await Schedule.findByIdAndUpdate(id,req.body)
      if(!response) throw new Error('Something went wrong ')
        const updated = {... response._doc, ... req.body}
        res.status(200).json(updated)
  } catch (error) {
      res.status(500).json({message : error.message})
  }
};

exports.getOne =  async (req,res)=>{
  const {id} = req.params
  try {
      const response = await Schedule.findById(id)
      if(!response) throw new Error('Something went wrong ')
        res.status(200).json(response)
  } catch (error) {
      res.status(500).json({message : error.message})
  }
};

exports.deleteOne = async (req,res)=>{
  const {id} = req.params
    try {
        const removed = await Schedule.findByIdAndDelete(id)
        if(!removed) throw new Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
};




