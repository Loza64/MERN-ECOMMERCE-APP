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
  const { usuario, nombres, apellidos, direccion, nacimiento, correo, telefono, pass, tipo } = req.body
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
        address: direccion,
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
      res.send({
        address: user.address,
        key: user.key,
        date: user.date,
        username: user.username,
        names: user.names,
        surnames: user.surnames,
        email: user.names,
        phone: user.phone
      });
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
const GetProducts = async (req, res) => {
  try {
    let result = await Products.find({})
    res.send(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
const GetProductsByCategorie = async (req, res) => {
  try {
    const { CategoryKey } = req.params;
    let result = await Products.find({ categorykey: CategoryKey })
    res.send(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
const GetProductByKey = async (req, res) => {
  const { key } = req.params;
  try {
    let result = await Products.findOne({ key })
    res.send(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const SearchProducts = async (req, res) => {
  try {
    const { product } = req.params;
    const result = await Products.find({
      name: {
        $regex: product,
        $options: 'i',
      }
    })
    res.send(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

//Funciones de las categorias
const NewCategorie = async (req, res) => {
  const { name } = req.body
  try {
    const check = await Categories.findOne({ name: name })
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
    let categories = await Categories.find({})
    res.send(categories)
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
  GetProductsByCategorie,
  GetProductByKey,
  SearchProducts
}