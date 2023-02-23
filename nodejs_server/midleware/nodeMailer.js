const nodemailer = require('nodemailer')

console.log('nodeamiler midlewalre called')
 const transforter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : "mernstackdevv@gmail.com",
        pass : "opriidznqqkbyzrm"
    }
})

 const sendMail = async (to , subject , text)=>{
    console.log(to,subject,text)
    console.log('send mail funciton called')
  const sent = await  transforter.sendMail({
        from : "<Quizett>mernstackdevv@gmail.com",
        to : `${to}`,
        subject : `${subject}`,
        text : `${text}`
    })
    console.log(sent)
}


const nodemailerMiddleWare = {
    transforter, sendMail
}

module.exports = nodemailerMiddleWare