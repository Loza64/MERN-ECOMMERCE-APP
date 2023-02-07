const uniquid = require('uniquid')
const jsontoken = require('jsonwebtoken')
const SendEmail = require('../Libraries/nodemailer')
const { UploadImage, DeleteImage } = require('../Libraries/cloudinary')
const { ComparePass, EncryptPass } = require('../Libraries/bcrypt')
const { Categories, Detailsales, Products, Sales, Users } = require('../Models/Model')

const SignUp = async (req, res) => {
  const { date, username, names, surnames, email, phone, password, type } = req
  const pass = await EncryptPass(password)
  new Users({ type, uniquid, username, names, surnames, date, email, phone, pass }).save((err) => {
    if (err) {
      res.send('Lo sentimos ocurrio un erro inesperado')
    } else {
      res.send('Registro realisado exitosamente')
    }
  })
}

const Login = async (req, res) => {
  const { user, pass } = req
  const users = await Users.findOne(user);
  if (users.key != null) {
    const checkpass = await ComparePass(pass, users.password);
    if (checkpass) {
      res.send(users)
    } else {
      res.send(null);
    }
  } else {
    res.send(null);
  }
}

module.exports = {
  SignUp,
  Login
}