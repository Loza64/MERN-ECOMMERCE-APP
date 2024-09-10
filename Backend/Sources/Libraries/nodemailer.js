import nodemailer from 'nodemailer'
import smtp from 'nodemailer-smtp-transport'
import { MAIL_BUSINESS, MAIL_PASS } from '../Config.js'

const transport = nodemailer.createTransport(
  smtp({
    service: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: MAIL_BUSINESS,
      pass: MAIL_PASS
    }
  })
)

export default function SendEmail(mailmessage) {
  transport.sendMail(mailmessage, (error, info) => {
    if (error) {
      console.error(error)
    } else {
      console.log('Email enviado con exito')
    }
  })
}