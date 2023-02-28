const fs = require('fs-extra')
const uniquid = require('uniquid')
const jsonwebtoken = require('jsonwebtoken')
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
  const { usuario, nombres, apellidos, nacimiento, correo, telefono, pass, tipo } = req.body
  try {
    const check = await Users.findOne({ username: usuario }, { email: correo }, { phone: telefono })
    if (check != null) {
      res.send(false)
    } else {
      let encryptPass = await EncryptPass(pass)
      new Users({
        key: uniquid(),
        username: usuario,
        names: nombres,
        surnames: apellidos,
        date: nacimiento,
        email: correo,
        phone: telefono,
        password: encryptPass,
        type: tipo
      }).save((err) => {
        if (!err) {
          res.send(true)
        } else {
          res.send(false)
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
const Login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await Users.findOne({ username: username })
    if (user != null && (await ComparePass(password, user.password))) {
      res.send(user);
    } else {
      res.send(false);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

//Funciones de los productos
const NewProduct = async (req, res) => {
  const { name, category, stock, company, details, price, discount } = req.body
  try {
    const check = Products.findOne({ name: name })
    if (check != null) {
      res.send('El producto ya existe en la base de datos.')
    } else {
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
        price: Number(price),
        discount: Number(discount)
      }).save((err) => {
        if (!err) {
          res.send('Producto guardado exitosamente.')
        }
      })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
const GetProducts = (req, res) => {
  try {
    Products.find({}, (err, docs) => {
      if (!err) {
        res.send(docs);
      }
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
const GetProductByCategorie = (req, res) => {
  try {
    const { CategoryKey } = req.body;
    Products.find({ categorykey: CategoryKey }, (err, docs) => {
      !err ? res.send(docs) : null;
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

//Funciones de las categorias
const NewCategorie = async (req, res) => {
  const { name } = req.body
  try {
    const check = Categories.findOne({ name: name })
    if (check != null) {
      res.send('La categoria ya existe en la bases de datos.')
    } else {
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
          res.send('Categoria guardada exitosamente.')
        }
      })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
const GetCategories = async (req, res) => {
  try {
    Categories.find({}, (err, docs) => {
      if (!err) {
        res.send(docs)
      }
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  SignUp,
  Login,
  NewProduct,
  GetProducts,
  NewCategorie,
  GetCategories,
  GetProductByCategorie
}