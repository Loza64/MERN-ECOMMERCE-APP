const fs = require('fs-extra')
const uniquid = require('uniquid')
const jsontoken = require('jsonwebtoken')
const SendEmail = require('../Libraries/nodemailer')
const { EncryptPass, ComparePass } = require('../Libraries/bcrypt')
const { UploadImage, DeleteImage } = require('../Libraries/cloudinary')
const { Categories, Detailsales, Products, Sales, Users } = require('../Models/Model')

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
  const { user, pass } = req.body
  const users = await Users.findOne({ username: user })
  const checkpass = await ComparePass(pass, users.password)
  if (checkpass) {
    res.send(users);
  } else {
    res.send(false);
  }
}

//Funciones de los productos
const NewProduct = async (req, res) => {
  const {name, color, category, stock, company, details, price } = req.body
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
    color:color,
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