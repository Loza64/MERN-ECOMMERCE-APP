const fs = require('fs-extra')
const uniquid = require('uniquid')
const jsontoken = require('jsonwebtoken')
const SendEmail = require('../Libraries/nodemailer')
const { EncryptPass, ComparePass } = require('../Libraries/bcrypt')
const { UploadImage, DeleteImage } = require('../Libraries/cloudinary')
const { Categories, Detailsales, Products, Sales, Users } = require('../Models/Model')
const datakey = uniquid()

//Funciones del usuario
const SignUp = async (req, res) => {
  const { usuario, nombres, apellidos, naciminento, correo, telefono, clave, tipo } = req.body
  let encryptpass = await EncryptPass(clave)
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
  const { nameproduct, imageproduct, categoryproduct, stockproduct, companyproduct, detailsproduct, priceproduct } = req.body
  const category = await Categories.findOne({ name: categoryproduct })
  let result;
  if (imageproduct) {
    result = await UploadImage(imageproduct.tempFilePath)
  }
  fs.remove(imageproduct.tempFilePath)
  new Products({
    key: datakey,
    categorykey: category.key,
    name: nameproduct,
    image: { public_id: result.public_id, url: result.url },
    stock: stockproduct,
    company: companyproduct,
    details: detailsproduct,
    price: priceproduct
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
  const { imagecategorie, namecategorie } = req.body
  let result
  if (imagecategorie) {
    result = await UploadImage(imagecategorie.tempFilePath)
  }
  fs.remove(imagecategorie.tempFilePath)
  new Categories({
    key: datakey,
    image: { public_id: result.public_id, url: result.url },
    name: namecategorie
  }).save((err) => {
    if (!err) {
      res.send('Categoria guardada exitosamente')
    } else {
      res.send('Lo sentimos, ocurrio un error inesperado')
    }
  })
}
const GetCategories = async () => {
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