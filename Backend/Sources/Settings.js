import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import session from 'express-session'
import MongoDBStoreFactory from 'connect-mongodb-session'
import path from 'path'

dotenv.config()

//Setting env
export const ConnectionCloud = process.env.MONGODB;
export const PORT = process.env.PORT;
export const ApiKey = process.env.APIKEY;
export const CloudName = process.env.CLOUDNAME;
export const ApiSecret = process.env.APISECRET;
export const MAIL_BUSINESS = process.env.MAILBUSINESS;
export const MAIL_PASS = process.env.MAILPASS;
export const Origin = process.env.ORIGIN;
export const TokenSecret = process.env.TOKEN;
export const Session = process.env.SESSION;
export const NodeEnv = process.env.NODE_ENV;
export const Stripes = process.env.STRIPE;


//Setting Application
export const CorsOptions = {
    origin: Origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}


//Setting Session
const MongoStore = new MongoDBStoreFactory(session)({
    uri: ConnectionCloud,
    collection: 'sessions',
    autoRemove: 'interval',
    autoRemoveInterval: 60 //Removes interval 1h
})

export const SessionApp = session({
    resave: true,
    name: 'Session',
    secret: Session,
    store: MongoStore,
    saveUninitialized: false,
    cookie: {
        secure: true,
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        sameSite: 'none'
    }
})


//Settings https
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const OptionsHttps = {
    key: readFileSync(path.join(__dirname, 'key.pem')),
    cert: readFileSync(path.join(__dirname, 'cert.pem'))
}