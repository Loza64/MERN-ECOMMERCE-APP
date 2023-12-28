import { remove } from "fs-extra"
import { UploadImage } from "../Libraries/cloudinary.js"
import { Products } from "../Models/Model.js"
import uniquid from "uniquid"

export const NewProduct = async (req, res, next) => {
  const { name, category, company, details } = req.body
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

      new Products({ key, image, category, name, company, details, stock, price, discount }).save().then(() => {
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
  const { Search, Categorie, Page, Type } = req.query
  try {
    const config = Categorie ? { name: { $regex: Search ?? "", $options: 'i' }, category: Categorie } : { name: { $regex: Search ?? "", $options: 'i' } }
    switch (Type) {
      case 'All':
        res.status(200).json({ state: true, result: await Products.paginate(config, { page: Page, limit: 15 }) })
        break;

      case 'Discount':
        res.status(200).json({ state: true, result: await Products.paginate({ ...config, discount: { $gt: 0 } }, { page: Page, limit: 15 }) })
        break;

      case 'Normal':
        res.status(200).json({ state: true, result: await Products.paginate({ ...config, discount: 0 }, { page: Page, limit: 15 }) })
        break;

      default:
        res.status(200).json({ state: true, result: null })
        break;
    }
  } catch (error) {
    next(error.message)
    res.status(500).json({ state: false, message: error.message })
  }
}

export const GetProductByName = async (req, res, next) => {
  const { Name } = req.params;
  const { Page } = req.query;
  try {
    const product = await Products.findOne({ name: Name })
    if (product) {
      const releated = await Products.paginate({ category: product.category }, { page: Page, limit: 10 })
      res.status(200).json({ state: true, product: { ...product._doc, releated } })
    } else {
      res.status(200).json({ state: true, product: null })
    }
  } catch (error) {
    next(error.message)
    res.status(500).json({ state: false, message: error.message })
  }
}