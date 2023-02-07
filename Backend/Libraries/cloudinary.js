const cloudinary = require('cloudinary').v2
const { ApiKey, ApiSecret, CloudName } = require('../Config')

cloudinary.config({
  api_key: ApiKey,
  api_secret: ApiSecret,
  cloud_name: CloudName,
  secure: true
})

const UploadImage = async (image) => {
  return await cloudinary.uploader.upload(image, { folder: 'ECOMMERCE' })
}

const DeleteImage = async (id) =>{
  return await cloudinary.uploader.destroy(id)
}

module.exports = {
  UploadImage,
  DeleteImage
}