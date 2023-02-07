const nodemailer = require('nodemailer')
const { MAIL_BUSINESS, MAIL_PASS } = require('../Config')

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAIL_BUSINESS,
    pass: MAIL_PASS
  }
})

const SendEmail = (mailmessage) => transport.sendMail(mailmessage, (error, info) => {
  if (error) {
    console.error(error)
  } else{
    console.log('Email enviado con exito')
  }
})

module.exports = SendEmail