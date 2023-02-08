const bcrypt = require('bcrypt')
const uniquid = require('uniquid')
const jsontoken = require('jsonwebtoken')
const SendEmail = require('../Libraries/nodemailer')
const { UploadImage, DeleteImage } = require('../Libraries/cloudinary')
const { Categories, Detailsales, Products, Sales, Users } = require('../Models/Model')
const datakey = uniquid();

const SignUp = async (req, res) => {
  const { usuario, nombres, apellidos, naciminento, correo, telefono, clave, tipo } = req.body;
  let encryptpass = await bcrypt.hash(clave, 10);
  new Users({
    key: datakey,
    username: usuario,
    names: nombres,
    surnames: apellidos,
    date: naciminento,
    email: correo,
    phone: telefono,
    password: encryptpass,
    type: tipo
  }).save((err) => {
    if (err) {
      res.send('Lo sentimos ocurrio un error inesperado')
    } else {
      res.send('Registro realisado exitosamente')
    }
  });
};

const Login = async (req, res) => {
  const { user, pass } = req.body;
  const users = await Users.findOne({ username: user })
  const checkpass = await bcrypt.compare(pass, users.password)
  if (checkpass) {
    res.send(users);
  } else {
    res.send(false);
  }
}

const GetProducts = (req, res) => {
  Products.find({}, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.error(error);
    }
  })
}
module.exports = {
  SignUp,
  Login,
  GetProducts
}