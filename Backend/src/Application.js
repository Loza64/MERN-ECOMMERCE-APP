import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import bodyparser from 'body-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { ConnectionCloud, NodeEnv, Origin, Session } from './Settings.js'
import routes from './Routes/api.routes.js'
import fileupload from 'express-fileupload'
import GetMongoConnection from './Connection/GetMongoConnection.js'

const ServerApp = express()

GetMongoConnection()
ServerApp.use(morgan('dev'))
ServerApp.use(cors({ origin: Origin, credentials: true }))
ServerApp.use(bodyparser.json({ limit: '100mb', extended: true }))
ServerApp.use(bodyparser.urlencoded({ limit: '100mb', extended: true }))
ServerApp.use(fileupload({ useTempFiles: true, tempFileDir: './Resources' }))
ServerApp.use('/backend/api/rest/ufostartserver/node/route/fetch/axios', routes)
ServerApp.use(session({
    secret: Session, resave: false, saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: ConnectionCloud }),
    cookie: { secure: NodeEnv === 'production', maxAge: 60 * 60 * 1000, }
}))

export default ServerApp;