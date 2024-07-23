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

      const upload = await new Products({ key, image, category, name, company, details, stock, price, discount }).save()
      if (upload) {
        remove(photo.tempFilePath)
        return res.status(201).json({ state: true, message: 'Producto guardado exitosamente.' })
      } else {
        remove(photo.tempFilePath)
        return res.status(500).json({ state: false, message: 'No se pudo registrar el producto, intentalo de nuevo.' })
      }


    } else {
      remove(photo.tempFilePath)
      return res.status(200).json({ state: false, message: 'El producto ya existe en la base de datos.' })
    }
  } catch (error) {
    next(error.message)
    return res.status(500).json({ state: false, message: error.message })
  }
}

export const GetProducts = async (req, res, next) => {
  const { Search, Categorie, Page, Type } = req.query
  try {
    const config = Categorie ? { name: { $regex: Search ?? "", $options: 'i' }, category: Categorie } : { name: { $regex: Search ?? "", $options: 'i' } }
    switch (Type) {
      case 'All': return res.status(200).json({ state: true, result: await Products.paginate(config, { page: Page, limit: 15 }) })


      case 'Discount': return res.status(200).json({ state: true, result: await Products.paginate({ ...config, discount: { $gt: 0 } }, { page: Page, limit: 15 }) })


      case 'Normal': return res.status(200).json({ state: true, result: await Products.paginate({ ...config, discount: 0 }, { page: Page, limit: 15 }) })


      default: return res.status(200).json({ state: true, result: await Products.paginate(config, { page: Page, limit: 15 }) })

    }
  } catch (error) {
    next(error.message)
    return res.status(500).json({ state: false, message: error.message })
  }
}

export const GetProductByName = async (req, res, next) => {
  const { Name } = req.params;
  const { Page } = req.query;
  try {
    const product = await Products.findOne({ name: Name })
    if (product) {
      const releated = await Products.paginate({ category: product.category, name: { $ne: Name } }, { page: Page, limit: 10 })
      return res.status(200).json({ state: true, product: { ...product._doc, releated } })
    } else {
      return res.status(200).json({ state: true, product: null })
    }
  } catch (error) {
    next(error.message)
    return res.status(500).json({ state: false, message: error.message })
  }
}