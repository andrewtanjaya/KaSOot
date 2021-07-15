const Case = require("../models/Case");

exports.addCase = async (req, res) => {
    try {
       
      const cases = new Case({
        listQuestion : req.body.listQuestion,
        schedule : req.body.schedule,
        name: req.body.name,
      });
      let data = await cases.save();
      res.status(201).json({ data });
    } catch (err) {
        console.log(req.body)
      res.status(400).json({err:err});
    }
};

exports.getAllCase =  async (req,res)=>{
  try {
      const cases = await Case.find()
      if(!cases) throw new Error('No user')
      res.status(200).json(cases)
  } catch (error) {
      res.status(500).json({message : error.message})
  }
};

exports.updateCase =  async (req,res)=>{
  const {id} = req.params
  try {
      const response = await Case.findByIdAndUpdate(id,req.body)
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
      const response = await Case.findById(id)
      if(!response) throw new Error('Something went wrong ')
        res.status(200).json(response)
  } catch (error) {
      res.status(500).json({message : error.message})
  }
};

exports.getQuiz = async (req,res)=>{
    const {id} = req.params
    try {
        const response = await Case.where('schedule').equals(id)
        if(!response) throw new Error('Something went wrong ')
          res.status(200).json(response)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
  };

exports.deleteOne = async (req,res)=>{
  const {id} = req.params
    try {
        const removed = await Case.findByIdAndDelete(id)
        if(!removed) throw new Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
};




