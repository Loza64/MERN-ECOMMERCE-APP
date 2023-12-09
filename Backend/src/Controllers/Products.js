import { remove } from "fs-extra"
import { UploadImage } from "../Libraries/cloudinary.js"
import { Products } from "../Models/Model.js"
import uniquid from "uniquid"

export const NewProduct = async (req, res, next) => {
  const { name, categorykey, company, details } = req.body
  try {
    const check = await Products.find({ name: name })
    if (check.length > 0) {
      res.status(200).json({ state: false, details: 'El producto ya existe en la base de datos.' })
    } else {

      const result = req.files.image ? await UploadImage(req.files.image.tempFilePath) : null
      const image = { public_id: result.public_id, url: result.url }
      const discount = Number(req.body.discount)
      remove(req.files.image.tempFilePath)
      const stock = Number(req.body.stock)
      const price = Number(req.body.price)
      const key = uniquid()

      new Products({ key, image, categorykey, name, company, details, stock, price, discount }).save().then(() => {
        res.status(200).json({ state: false, details: 'Producto guardado exitosamente.' })
      })
    }
  } catch (error) {
    next(error.message)
    res.status(500).json({ state: false, message: error.message })
  }
}

export const GetProducts = async (req, res, next) => {
  const { Product, Page, Categorie } = req.query
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