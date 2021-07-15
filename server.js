const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {PORT, mongoUri} = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/api/user')
const scheduleRoutes = require('./routes/api/schedule')
const caseRoutes = require('./routes/api/case')
const ansRoutes = require('./routes/api/ans')
const multer = require("multer")

// allow to make ajax request from front end to backend
app.use(cors())

//log request to console
app.use(morgan('tiny'))

//parse to JSON
app.use(bodyParser.json())

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + new Date().toLocaleDateString('ko-KR'))
    }
  })
   
  var upload = multer({ storage: storage })
  app.get('/api/download/:id', function(req, res){
    const {id} = req.params 
    const file = `./uploads/`+id;
    res.download(file); // Set disposition and send it.
  });
  app.post('/api/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.status(200).json(file)
  })

mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
        useFindAndModify: false
}).then(()=>console.log('MongoDB database Connected...'))
.catch((err)=>console.log(err))



app.use('/api/ans/',ansRoutes)
app.use('/api/case/',caseRoutes)
app.use('/api/schedule/',scheduleRoutes)
app.use('/api/user',userRoutes)

app.listen(PORT, ()=> console.log(`Listening to https://localhost:${PORT}`))