import cloudinary from 'cloudinary'
import { ApiKey, ApiSecret, CloudName } from '../Settings.js'

cloudinary.v2.config({
  api_key: ApiKey,
  api_secret: ApiSecret,
  cloud_name: CloudName,
  secure: true
})

export const UploadImage = async (image) => {
  return await cloudinary.v2.uploader.upload(image, { folder: 'ECOMMERCE' })
}

export const DeleteImage = async (public_id) => {
  return await cloudinary.v2.uploader.destroy(public_id)
}