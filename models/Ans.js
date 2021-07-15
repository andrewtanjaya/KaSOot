const{Schema, model} = require('mongoose')

const AnsSchema = new Schema({
    userid: {
        type : String,
        required : true
    },
    ans:{
        type : Array,
        required : true,
    },
    result:{
        type : Number,
        required : true,
    },
    case:{
        type : String,
        required : true,
    },
    schedule:{
        type : String,
        required : true,
    },
    username:{
        type:String,
        required : true,
    },
    schedulename:{
        type : String,
        required : true,
    },
    filepath:{
        type: String,
    }
  })

const Ans = model("Ans", AnsSchema);

module.exports = Ans;