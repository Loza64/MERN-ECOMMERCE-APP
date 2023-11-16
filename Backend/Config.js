import dotenv from 'dotenv'
dotenv.config()

export const ConnectionCloud = process.env.MONGODB_URI_CLOUD
export const PORT = process.env.PORT
export const ApiKey = process.env.API_KEY
export const CloudName = process.env.CLOUD_NAME
export const ApiSecret = process.env.API_SECRET
export const MAIL_BUSINESS = process.env.MAIL_BUSINESS
export const MAIL_PASS = process.env.MAIL_PASS
