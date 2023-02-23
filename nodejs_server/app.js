const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const  userModel = require('./models/userModel')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const passportLocal = require('passport-local').Strategy
const session = require('express-session')
require('dotenv').config()
const path = require('path')
const eventRouter = require('./routes/eventRoute')
const userRouter = require('./routes/userRoute')
const port = process.env.PORT || 5000;
const cors = require('cors')
const eventModel = require('./models/eventModel')
const jwt = require("jsonwebtoken")
const nodemailerMiddleWare = require('./midleware/nodeMailer')


app.use('/' , express.static(__dirname + '/public'))
app.use('/user' , express.static(__dirname + '/public'))
app.use('/event' , express.static(__dirname + '/public'))

// mongoose.connect(process.env.DB_URL_LIVE).then(res=>console.log('compass db connected')).catch(err => console.log(err))
 mongoose.connect("mongodb+srv://asim:mardan@cluster0.btwlh.mongodb.net/quizit?retryWrites=true&w=majority").then(res=>console.log('atlass db connecteed')).catch(err => console.log(err))




// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({
  origin : ["http://localhost:5173"]
}))



const checkUserToken = async (req ,res , done) => {
try {
  if(req.headers['x-access-token'] !== "") {
    const token =req.headers['x-access-token'].toString()
    const verfiyUser = jwt.verify(token , "mysuperSecret")
    const user = await userModel.findById(verfiyUser._id)
    req.user = user;
    return done()
  }
} catch (error) {
  console.log(error)
  return res.status(401).json({success : false , msg : "Auth Token error"})
}
}



app.use(session({
  secret : "mySuperSecret",
  resave: true,
  saveUninitialized : false,
}))
app.use(flash())


app.use(passport.initialize())
app.use(passport.session())

app.use('/quiz' , eventRouter)
app.use('/user' , userRouter)


passport.use(new passportLocal({usernameField : "email"},
function(username, password, done) {
    userModel.findOne({ email : username }, async function   (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false , "No user Found !"); }
      if (! await bcrypt.compare(password ,user.password)) { return done(null, false , "Wrong credentials !"); }
      return done(null, user);
    });
  }
));

passport.serializeUser( (user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async(userId, done) => {
  const userObj = await userModel.findById(userId)
  done(null, userObj)
})


app.get("/"   , async(req ,res) =>{
 res.send('homepage')
})



app.get("/private"   , checkUserToken,async(req ,res) =>{
  const data  = ["asim" , 'shaha' , 'okay']
  res.status(200).json({success : true , data : data })
 })



 app.get("/checkOtpVerified"   , checkUserToken,async(req ,res) =>{
  res.status(200).json({ email : req.user.email , otpVerified : req.user.otpVerified})
 })
 
 app.post("/getOtpCode"   , checkUserToken,async(req ,res) =>{
  var randomFixedInteger = function (length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}
// generating otp and sending through mail and saving to db
// nodemailerMiddleWare.sendMail("asimshah8110@gmail.com" , "subbb" , "some text")
const {email}  = req.body;
const otp = randomFixedInteger(6)

const user = await userModel.findOne({email})
if(!user){
  return res.status(200).json({otp : false})
}
user.otp = otp

await user.save()
nodemailerMiddleWare.sendMail(email , "OTP Code" , `Your  OTP Code is ${otp}`)


  res.status(200).json({ otp : true})
 })


 app.post("/verifyOtp"   , checkUserToken,async(req ,res) =>{
  // generating otp and sending through mail and saving to db
  const {email , otpCode}  = req.body
  const user = await userModel.findOne({email})
  console.log(user.otp , otpCode)
if(!user){
  return res.status(200).json({otpVerified : false})
}
if(user.otp !== otpCode){
  return res.status(200).json({otpVerified : false})
  }
user.otpVerified = true;
await user.save()
res.status(200).json({ otpVerified : true})
   })



app.get("/login"  ,  async(req ,res) =>{
 res.status(200).json({sucess : false , user : null})
})


 

app.get("/register"  ,  async(req ,res) =>{
  res.render('Signup')
 })
 



app.post("/register" , async(req ,res) =>{
  console.log(req.body)
  const {fullName , email , password} = req.body
  const hashPassword = await bcrypt.hash(password , 10)
  const data  = new userModel({
    fullName,
    email ,
    password : hashPassword
  })
  
  try {
    const findUser = await userModel.findOne({email : email})
    if(findUser){
      return res.status(200).json({msg : "User Already Registered !" , success : false})
    }
    const newUser =  await data.save()
    const token  = await data.AuthUser()
    return res.status(201).json({ token : token})
  } catch (error) {
    console.log(error)
     res.status(400).json({msg : error , success : false})

  }

})


app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' , failureFlash : true}),
  async function(req, res) {
    const token = await req.user.AuthUser()
    res.status(200).send({token : token })
  });





app.get('/logout', (req, res) => {
    req.logout(null, () => {
        res.redirect('/login')
    });
});




app.get('/*', (req, res) => {
 res.status(404).send('page not found')
});





app.listen(port , ()=>{
    console.log(`server is running on port ${port} , http://localhost:${port}`)
})
