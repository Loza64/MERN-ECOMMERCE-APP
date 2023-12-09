import fs from 'fs-extra'
import uniquid from 'uniquid'
import { UploadImage } from '../Libraries/cloudinary.js'
import { Categories } from '../Models/Model.js'

export const NewCategorie = async (req, res, next) => {
  const { name } = req.body
  try {
    const check = await Categories.findOne({ name: name })
    if (check != null) {
      res.state(200).json({ state: false, message: 'La categoria ya existe en la base de datos.' })
    } else {

      let result = req.files.image ? await UploadImage(req.files.image.tempFilePath) : null
      fs.remove(req.files.image.tempFilePath)

      new Categories({
        key: uniquid(),
        image: { public_id: result.public_id, url: result.url },
        name: name
      }).save().then(() => {
        (err) => {
          if (!err) {
            res.state(200).json({ state: true, message: 'Categoria guardada exitosamente.' })
          }
        }
      })
    }
  } catch (error) {
    next(error)
  }
}
export const GetCategories = async (req, res) => {
  try {
    let result = await Categories.find({})
    res.status(200).json({ state: true, result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}