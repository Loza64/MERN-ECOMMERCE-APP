const fs = require('fs-extra')
const uniquid = require('uniquid')
const jsontoken = require('jsonwebtoken')
const SendEmail = require('../Libraries/nodemailer')
const { EncryptPass, ComparePass } = require('../Libraries/bcrypt')
const { UploadImage, DeleteImage } = require('../Libraries/cloudinary')
const { Categories, Detailsales, Products, Sales, Users } = require('../Models/Model')

//Body mailmessage
let emailmessage = {
  from: String,
  to: String,
  subject: String,
  html: String
}

//Funciones del usuario
const SignUp = async (req, res) => {
  const { usuario, nombres, apellidos, naciminento, correo, telefono, clave, tipo } = req.body
  let encryptpass = await EncryptPass(clave)
  new Users({
    key: uniquid(),
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
}
const Login = async (req, res) => {
  const { username, password } = req.body
  const user = await Users.findOne({ username: username })
  if (user != null && (await ComparePass(password, user.password))) {
    res.send(user);
  } else {
    res.send(null);
  }
}

//Funciones de los productos
const NewProduct = async (req, res) => {
  const { name, category, stock, company, details, price } = req.body
  const getcategory = await Categories.findOne({ name: category })
  let result;
  if (req.files.image) {
    result = await UploadImage(req.files.image.tempFilePath)
  }
  fs.remove(req.files.image.tempFilePath)
  new Products({
    key: uniquid(),
    image: { public_id: result.public_id, url: result.url },
    categorykey: getcategory.key,
    name: name,
    company: company,
    details: details,
    stock: Number(stock),
    price: Number(price)
  }).save((err) => {
    if (!err) {
      res.send('Producto guardado exitosamente')
    } else {
      res.send('Lo sentimos, ocurrio un error inesperado')
    }
  })
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

//Funciones de las categorias
const NewCategorie = async (req, res) => {
  const { name } = req.body
  let result
  if (req.files.image) {
    result = await UploadImage(req.files.image.tempFilePath)
  }
  fs.remove(req.files.image.tempFilePath)
  new Categories({
    key: uniquid(),
    image: { public_id: result.public_id, url: result.url },
    name: name
  }).save((err) => {
    if (!err) {
      res.send('Categoria guardada exitosamente')
    } else {
      res.send('Lo sentimos, ocurrio un error inesperado')
    }
  })
}
const GetCategories = async (req, res) => {
  Categories.find({}, (err, docs) => {
    if (err) {
      res.send('Lo sentimos, ocurrio un error inesperado')
    } else {
      res.send(docs)
    }
  })
}

module.exports = {
  SignUp,
  Login,
  NewProduct,
  GetProducts,
  NewCategorie,
  GetCategories
}