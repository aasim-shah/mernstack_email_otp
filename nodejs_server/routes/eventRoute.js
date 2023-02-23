const eventModel = require('../models/eventModel')

const router = require('express').Router()


router.get('/' , async(req ,res) =>{
    res.send('event')
})





router.post('/new'  ,async(req ,res) =>{
    const user  = req.user
    const {headline , subHeadline  , content} = req.body
    console.log(user)
    const data =  new eventModel({
        headline , 
        subHeadline ,
        content,
        author : req.user._id,
        authorId : req.user._id,
        authorName : req.user.firstName + " " + req.user.lastName,
        authorProfilePic : req.user.profilePic,
        image : req.file?.filename
    })
const saved_data = await data.save()

    user.events.push(saved_data._id)
    console.log(data)
    await user.save()
    req.flash('success' , 'New event Added !')
    res.redirect('/user/admin')
})


router.get('/edit/:id' , async(req ,res) =>{
    const {id } = req.params
    const event = await eventModel.findById(id)
    res.render('Editevent' , {event})
})



router.get('/view/:id' , async(req ,res) =>{
    const {id } = req.params
    const event = await eventModel.findById(id)
    res.render('Viewevent' , {event})
})


router.post('/edit' , async(req ,res) =>{
    const { eventId , headline , subHeadline  , content} = req.body
    const event = await eventModel.findById(eventId)
    event.headline = headline
    event.subHeadline = subHeadline
    event.content = content 
    event.image = req.file?.filename || event.image
    await event.save()
    req.flash('success' , "event Updated !")
    res.redirect('back')
})

router.get('/delete/:id' , async(req ,res) =>{
    const {id  ,} = req.params
    const event = await eventModel.findByIdAndRemove(id)
    req.flash('error' , "event Deleted )")
    res.redirect('/')
})


module.exports = router;