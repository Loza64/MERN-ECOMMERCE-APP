import dotenv from 'dotenv'
import session from 'express-session'
import MongoStore from 'connect-mongo'

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
export const Session = process.env.SESSION
export const NodeEnv = process.env.NODE_ENV

export const SessionServer = session({
    secret: Session,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: { secure: true, maxAge: 60 * 60 * 1000, },
    store: MongoStore.create({
        mongoUrl: ConnectionCloud,
        autoRemove: 'native',
        autoRemoveInterval: 60 * 60 //Recoleccion de basura cada hora
    })
})
