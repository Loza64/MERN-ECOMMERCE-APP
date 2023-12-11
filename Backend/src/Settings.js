import dotenv from 'dotenv'

dotenv.config()

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

export const CorsOptions = {
    origin: Origin,
    credentials: true,
    methods: '*',
    optionsSuccessStatus: true
}

export const SessionSettings = {
    name: 'UserSessions', 
    resave: false,
    saveUninitialized: false,
    secret: Session,
    cookie: {
        path: '/',
        secure: true,
        maxAge: 60 * 60 * 1000,
        sameSite: 'strict',
        domain: Origin
    }
}

export const MongoSettings = {
    uri: ConnectionCloud,
    collection: 'sessions',
    autoRemove: 'interval',
    autoRemoveInterval: 60 //Remove sessions every 60 minutes
}