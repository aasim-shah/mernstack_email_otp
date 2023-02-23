const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')

const userSchema  = mongoose.Schema({
    fullName  : String,
    role  : [{type : String , default : "USER"}],
    email : {type: String , required : true , lowercase: true,} ,
    otp : String,
    otpVerified : {type : Boolean , default : false},
    password : {type: String , required : true  } ,
    events : [
        {type : mongoose.Schema.Types.ObjectId , ref : "quiz"}
    ],
    tokens : [{
        token : String,
    }],
})


userSchema.methods.AuthUser = async function(){
    const token = JWT.sign({_id : this._id} , 'mysuperSecret' , {expiresIn: "7h"})
    this.tokens = this.tokens.concat({token : token})
    await this.save()
    return token;
}

const userModel = mongoose.model('user', userSchema)
module.exports = userModel;
