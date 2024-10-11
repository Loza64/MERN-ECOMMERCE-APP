import debug from 'debug'
import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import session from 'express-session'
import MongoDBStoreFactory from 'connect-mongodb-session'
import path from 'path'

export const Success = debug('Application:[Success]')
export const Error = debug('Application:[Failure]')
export const Database = debug('Application:[Database]')
export const Session = debug('Application:[Session]')
export const Server = debug('Application:[Server]')

dotenv.config()
const { MONGODB, PORT, APIKEY, CLOUDNAME, APISECRET, MAILBUSINESS, MAILPASS, ORIGIN, TOKEN, SESSION, DOMAIN} = process.env

//Setting env
export const ConnectionCloud = MONGODB;
export const Port = PORT;
export const ApiKey = APIKEY;
export const CloudName = CLOUDNAME;
export const ApiSecret = APISECRET;
export const MAIL_BUSINESS = MAILBUSINESS;
export const MAIL_PASS = MAILPASS;
export const Origin = ORIGIN;
export const TokenSecret = TOKEN;
export const SessionSecret = SESSION;

//Setting Application
export const CorsOptions = {
    origin: Origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}

export const HelmetConfig = {
    xssFilter: true, // Habilitar protección contra XSS  
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }, // Configurar HSTS  
    frameguard: { action: 'deny' }, // No permitir iframes  
    dnsPrefetchControl: { allow: false }, // No pre-resolver dominios  
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
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
    secret: SessionSecret,
    store: MongoStore,
    saveUninitialized: false,
    cookie: {
        secure: true,
        domain: DOMAIN,
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        sameSite: 'none'
    }
})

export const LimiterConfig = {
    limit: 1000,
    windowMs: 1000 * 60 * 10,
    handler: (req, res) => {
        res.status(429).json({
            error: "Too many requests",
            message: "The request's limit has been exceeded for this IP, please try again later."
        });
    }
}

//Settings https
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ConfigHttps = {
    key: readFileSync(path.join(__dirname, '../key.pem')),
    cert: readFileSync(path.join(__dirname, '../cert.pem'))
}