var mongoose = require('mongoose');
 
var fileSchema = new mongoose.Schema({
    userid: String,
    username : String,
    file:
    {
        data: Buffer,
        contentType: String
    }
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('File', fileSchema);