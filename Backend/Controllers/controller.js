const SendEmail = require('../Libraries/nodemailer')
const { UploadImage, DeleteImage } = require('../Libraries/cloudinary')
const { ComparePass, EncyptPass } = require('../Libraries/bcrypt')
const { categories, detailsales, products, sales, users } = require('../Models/Model')