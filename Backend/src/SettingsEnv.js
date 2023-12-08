import dotenv from 'dotenv'
dotenv.config()

export const ConnectionCloud = process.env.MONGODB
export const PORT = process.env.PORT
export const ApiKey = process.env.APIKEY
export const CloudName = process.env.CLOUDNAME
export const ApiSecret = process.env.APISECRET
export const MAIL_BUSINESS = process.env.MAILBUSINESS
export const MAIL_PASS = process.env.MAILPASS
export const Origin = process.env.ORIGIN
export const TokenSecret = process.env.TOKEN
