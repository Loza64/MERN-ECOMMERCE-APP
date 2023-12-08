import { UploadImage } from "../Libraries/cloudinary.js"
import { Products } from "../Models/Model.js"
import fs from 'fs-extra'

export const NewProduct = async (req, res) => {
  const { name, category, stock, company, details, price, discount } = req.body
  try {
    const check = await Products.find({ name: name })
    if (check.length > 0) {
      res.status(200).json({ state: false, details: 'El producto ya existe en la base de datos.' })
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
      }).save().then(() => {
        res.status(200).json({ state: false, details: 'Producto guardado exitosamente.' })
      })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const GetProducts = async (req, res) => {
  try {
    let result = await Products.find({})
    res.status(200).json({ state: true, result })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const GetProductsByCategorie = async (req, res) => {
  try {
    const { categorykey } = req.params;
    let result = await Products.find({ categorykey: categorykey })
    res.status(200).json({ state: true, result })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const GetProductByKey = async (req, res) => {
  const { key } = req.params;
  try {
    let result = await Products.findOne({ key })
    res.status(200).json({ state: true, result })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const SearchProducts = async (req, res) => {
  try {
    const { product } = req.params;
    const result = await Products.find({ name: { $regex: product, $options: 'i' } })
    res.status(200).json({ state: true, result })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}