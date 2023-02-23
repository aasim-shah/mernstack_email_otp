const mongoose = require('mongoose')

const eventSchema  = mongoose.Schema({
   title : String,
   dated : {type : Date},
   access : String,
   userRef  : {type : mongoose.Schema.Types.ObjectId , ref : "user"},
   allowredUser : [{type : mongoose.Types.ObjectId , ref  : "user"}],
   createdAt : {type : Date , default : Date.now()}

})


const eventModel = mongoose.model('event', eventSchema)
module.exports = eventModel;
