import { remove } from "fs-extra"
import { UploadImage } from "../Libraries/cloudinary.js"
import { Products } from "../Models/Model.js"
import uniquid from "uniquid"

export const NewProduct = async (req, res, next) => {
  const { name, categorykey, company, details } = req.body
  try {
    const { photo } = req.files;
    const check = await Products.findOne({ name: name })

    if (!check) {
      const result = photo ? await UploadImage(photo.tempFilePath) : null
      const image = { public_id: result.public_id, url: result.url }
      const discount = Number(req.body.discount)
      const stock = Number(req.body.stock)
      const price = Number(req.body.price)
      const key = uniquid()

      new Products({ key, image, categorykey, name, company, details, stock, price, discount }).save().then(() => {
        remove(photo.tempFilePath)
        res.status(200).json({ state: false, details: 'Producto guardado exitosamente.' })
      }).catch((error) => {
        next(error.message)
        remove(photo.tempFilePath)
        res.status(500).json({ state: false, message: error.message })
      })
    } else {
      remove(photo.tempFilePath)
      res.status(200).json({ state: false, details: 'El producto ya existe en la base de datos.' })
    }
  } catch (error) {
    next(error.message)
    res.status(500).json({ state: false, message: error.message })
  }
}

export const GetProducts = async (req, res, next) => {
  const { Product, Categorie, Page } = req.query
  try {
    const config = Categorie ? { name: { $regex: Product ?? "", $options: 'i' }, categorykey: Categorie } :
      { name: { $regex: Product ?? "", $options: 'i' } }
    const result = await Products.paginate(config, { page: Page, limit: 15 }
    )
    res.status(200).json({ state: true, result })
  } catch (error) {
    next(error.message)
    res.status(500).json({ state: false, message: error.message })
  }
}

export const GetProductByKey = async (req, res, next) => {
  const { key } = req.params;
  try {
    let result = await Products.findOne({ key })
    res.status(200).json({ state: true, result })
  } catch (error) {
    next(error.message)
    res.status(500).json({ state: false, message: error.message })
  }
}