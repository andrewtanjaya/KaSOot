const Ans = require("../models/Ans");

exports.addAns = async (req, res) => {
    console.log(req.body)
    try {
      const ans = new Ans({
        userid : req.body.userid,
        ans : req.body.ans,
        result: req.body.result,
        case: req.body.case,
        schedule : req.body.schedule,
        username : req.body.username,
        schedulename : req.body.schedulename,
        filepath : req.body.path
      });
      if(req.file){
          ans.ans = req.file.path
      }
      let data = await ans.save();
      res.status(201).json({ data });
    } catch (err) {
        console.log(req.body)
      res.status(400).json({err:err});
    }
};

exports.getAllAns =  async (req,res)=>{
  try {
      const ans = await Ans.find()
      if(!ans) throw new Error('No Ans')
      res.status(200).json(ans)
  } catch (error) {
      res.status(500).json({message : error.message})
  }
};

exports.updateAns =  async (req,res)=>{
  const {id} = req.params
  try {
      const response = await Ans.findByIdAndUpdate(id,req.body)
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
      const response = await Ans.findById(id)
      if(!response) throw new Error('Something went wrong ')
        res.status(200).json(response)
  } catch (error) {
      res.status(500).json({message : error.message})
  }
};

exports.getOneUserAns =  async (req,res)=>{
    const {id} = req.params
    try {
        const response = await Ans.where('userid').equals(id)
        if(!response) throw new Error('Something went wrong ')
          res.status(200).json(response)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
  };

exports.deleteOne = async (req,res)=>{
  const {id} = req.params
    try {
        const removed = await Ans.findByIdAndDelete(id)
        if(!removed) throw new Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
};




