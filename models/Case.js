const{Schema, model} = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const lsQuestionSchema = new Schema({
    question : String,
    choices : [String],
    type : String,
    ans : [String]
})
const CaseSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Include your Name"]
    },
    schedule:{
        type : String,
        required: true,
        unique: true
    },
    listQuestion : [lsQuestionSchema]

  })

  try{
    lsQuestionSchema.plugin(uniqueValidator)
  } catch (error) {
    throw new Error({ error: "" });
  }

const Case = model("Case", CaseSchema);

module.exports = Case;