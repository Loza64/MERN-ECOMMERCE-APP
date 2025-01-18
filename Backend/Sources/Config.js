import debug from 'debug'
import environtment from 'dotenv/config'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import MongoDBStoreFactory from 'connect-mongodb-session'
import session from 'express-session'
import path from 'path'

export const Success = debug('Application:[Success]')
export const Error = debug('Application:[Failure]')
export const Database = debug('Application:[Database]')
export const Session = debug('Application:[Session]')
export const Server = debug('Application:[Server]')

environtment;
const { MONGODB, PORT, APIKEY, CLOUDNAME, APISECRET, MAILBUSINESS, MAILPASS, ORIGIN, TOKEN, SESSION, CRYPTOKEY } = process.env

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
export const CryptoKey = CRYPTOKEY;

//Setting Application
export const CorsOptions = {
    origin: Origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}

export const HelmetConfig = {
    xssFilter: true, // Habilitar pr/ o true/false dependiendo de tus necesidades  otección contra XSS  
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }, // Configurar HSTS  
    frameguard: { action: 'deny' }, // No permitir iframes  
    dnsPrefetchControl: { allow: false }, // No pre-resolver dominios  
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}


const MongoStore = new MongoDBStoreFactory(session)({
    uri: ConnectionCloud,
    collection: 'sessions',
    autoRemove: 'interval',
    autoRemoveInterval: 60 //Removes interval 1h
})

export const SessionConfig = {
    resave: true,
    name: 'Session',
    secret: SessionSecret,
    store: MongoStore,
    saveUninitialized: false,
    cookie: {
        originalMaxAge: 3600000, // 1 hour
        partitioned: true,
        priority: "High",
        expires: new Date(Date.now() + 3600000), // 1 hour
        secure: true,
        httpOnly: true,
        domain: null,
        path: "/",
        sameSite: "none",
    }
}

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