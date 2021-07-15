const User = require("../models/User");
const Bcrypt = require("bcrypt");


exports.registerNewUser = async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      let data = await user.save();
      const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
      res.status(201).json({ data, token });
    } catch (err) {
      res.status(400).json({err:err});
    }
};

exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).json({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.check_token = async (req,res) =>{
  try {
    const token = req.body.token;
    
    const user = await User.findByToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmRhMzUwOWI5NTczZjc2Mjc2NGRjNDQiLCJuYW1lIjoiYW5kcmV3IiwiZW1haWwiOiJhbmRyZXd0YW5qYXlhMjFAZ21haWwuY29tIiwiaWF0IjoxNjA4MTM2MTU3fQ.lhXea0flLZ9Go0tUUEwnSvFoK9L-erMnjalyTzIcjLM");
    if (!user) {
      return res.status(401).json({ error: "Login failed!" });
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
}

exports.getAllUser =  async (req,res)=>{
  try {
      const user = await User.find()
      if(!user) throw new Error('No user')
      res.status(200).json(user)
  } catch (error) {
      res.status(500).json({message : error.message})
  }
};

exports.updateUser =  async (req,res)=>{
  const {id} = req.params
  try {
      req.body.password = Bcrypt.hashSync(req.body.password, 8);
      const response = await User.findByIdAndUpdate(id,req.body)
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
      const response = await User.findById(id)
      if(!response) throw new Error('Something went wrong ')
        res.status(200).json(response)
  } catch (error) {
      res.status(500).json({message : error.message})
  }
};

exports.deleteOne = async (req,res)=>{
  const {id} = req.params
    try {
        const removed = await User.findByIdAndDelete(id)
        if(!removed) throw new Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
};

exports.getUserDetails = async (req, res) => {
  await res.json(req.userData);
};

