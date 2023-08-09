import nodemailer from 'nodemailer'
import { MAIL_BUSINESS, MAIL_PASS } from '../Config.js'

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAIL_BUSINESS,
    pass: MAIL_PASS
  }
})

export default function SendEmail(mailmessage) {
  transport.sendMail(mailmessage, (error, info) => {
    if (error) {
      console.error(error)
    } else {
      console.log('Email enviado con exito')
    }
  })
}