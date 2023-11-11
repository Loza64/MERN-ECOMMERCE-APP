import fs from 'fs-extra'
import uniquid from 'uniquid'
import { EncryptPass, ComparePass } from '../Libraries/bcrypt.js'
import { UploadImage, DeleteImage } from '../Libraries/cloudinary.js'
import { Categories, Detailsales, Products, Sales, Users } from '../Models/Model.js'

//Body mailmessage
let emailmessage = {
  from: String,
  to: String,
  subject: String,
  html: String
}

//Funciones del usuario
export const SignUp = async (req, res) => {
  const { usuario, nombres, apellidos, direccion, nacimiento, correo, telefono, pass, tipo } = req.body
  try {
    const check = await Users.findOne({ username: usuario }, { email: correo }, { phone: telefono })
    if (check != null) {
      res.send(false)
    } else {
      new Users({
        key: uniquid(),
        username: usuario,
        names: nombres,
        surnames: apellidos,
        address: direccion,
        date: nacimiento,
        email: correo,
        phone: telefono,
        password: await EncryptPass(pass),
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
export const Login = async (req, res) => {
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
export const NewProduct = async (req, res) => {
  const { name, category, stock, company, details, price, discount } = req.body
  try {
    const check = await Products.find({ name: name })
    if (check.length > 0) {
      res.send('El producto ya existe en la base de datos.')
    } else {

      const getcategory = await Categories.findOne({ name: category })
      let result = req.files.image ? await UploadImage(req.files.image.tempFilePath) : null
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
export const GetProducts = async (req, res) => {
  try {
    let result = await Products.find({})
    res.send(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const GetProductsByCategorie = async (req, res) => {
  try {
    const { categorykey } = req.params;
    let result = await Products.find({ categorykey: CategoryKey })
    res.send(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const GetProductByKey = async (req, res) => {
  const { key } = req.params;
  try {
    let result = await Products.findOne({ key })
    res.send(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const SearchProducts = async (req, res) => {
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
export const NewCategorie = async (req, res) => {
  const { name } = req.body
  try {
    const check = await Categories.findOne({ name: name })
    if (check != null) {
      res.send('La categoria ya existe en la bases de datos.')
    } else {

      let result = req.files.image ? await UploadImage(req.files.image.tempFilePath) : null
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
export const GetCategories = async (req, res) => {
  try {
    let categories = await Categories.find({})
    res.send(categories)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}