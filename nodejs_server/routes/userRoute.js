const router = require('express').Router()
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')


const checkIsAdmin = async (req ,res , done) => {
  if(req.headers['x-access-token'] !== "") {
    const token =req.headers['x-access-token'].toString()
    const verfiyUser = jwt.verify(token , "mysuperSecret")
    const user = await userModel.findById(verfiyUser._id)
    if(user.role === "ADMIN"){ 
      console.log(user)
      return done()
    }
    return res.status(400).json({sucess : false , msg : "no auth token"})

  }
   res.status(400).json({sucess : false , msg : "no auth token"})
}


router.get('/' , async(req ,res) =>{
    res.send('user')
})





router.get("/admin"     , checkIsAdmin, async(req ,res) =>{
  res.send('admin homepage')
 })

router.get("/profile"   , async(req ,res) =>{
    console.log(req.user)
    res.render('Profile' , {user : req.user})
   })
   

   router.post("/update_profile" , async(req ,res) =>{
    const {name , email } = req.body
     try {
      const findUser = await userModel.findOne({email : email})
      if(!findUser){
        req.flash('error'  , 'Something Went Wrong !')
       res.redirect('/user/profile')
      }

      
      findUser.name = name
      findUser.email = email
      
      await findUser.save()
      req.flash('success' , "user Profile Updated !")
      res.redirect('/user/profile')
      
    } catch (error) {
      console.log(error)
      res.send({error})
    }
  
  })
   
  router.get("/delete_profile/:id", async(req ,res) =>{
    const {id} = req.params
    const user = await userModel.findByIdAndRemove(id)
    req.flash('error' , "user Profile removed")
  res.redirect('/login')   
  })



module.exports = router;