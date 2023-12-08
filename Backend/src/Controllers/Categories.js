import fs from 'fs-extra'
import uniquid from 'uniquid'
import { UploadImage } from '../Libraries/cloudinary.js'
import { Categories } from '../Models/Model.js'

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