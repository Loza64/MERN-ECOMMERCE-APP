const uniquid = require('uniquid')
const jsontoken = require('jsonwebtoken')
const SendEmail = require('../Libraries/nodemailer')
const { UploadImage, DeleteImage } = require('../Libraries/cloudinary')
const { ComparePass, EncryptPass } = require('../Libraries/bcrypt')
const { Categories, Detailsales, Products, Sales, Users } = require('../Models/Model')
const datakey = uniquid();


const SignUp = async (req, res) => {
  const { usuario, nombres, apellidos, naciminento, correo, clave, pass, tipo } = req
  const encryptpass = await EncryptPass(password)
  new Users({
    datakey, usuario, nombres, apellidos, naciminento, correo, telefono, encryptpass, tipo
  }).save((err) => {
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