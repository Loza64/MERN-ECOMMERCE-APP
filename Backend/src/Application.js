import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import bodyparser from 'body-parser'
import routes from './Routes/api.routes.js'
import fileupload from 'express-fileupload'
import expressSession from 'express-session'
import MongoDBStoreFactory from 'connect-mongodb-session'
import GetMongoConnection from './Connection/GetMongoConnection.js'
import { CorsOptions, MongoSettings, SessionSettings } from './Settings.js'

const ServerApp = express()
const MongoDBStore = MongoDBStoreFactory(expressSession)
const StoreSessionsMongo = new MongoDBStore(MongoSettings)

GetMongoConnection()
ServerApp.use(morgan('dev'))
ServerApp.use(cors(CorsOptions))
ServerApp.use(bodyparser.json({ limit: '100mb', extended: true }))
ServerApp.use(bodyparser.urlencoded({ limit: '100mb', extended: true }))
ServerApp.use(fileupload({ useTempFiles: true, tempFileDir: './Resources' }))
ServerApp.use(expressSession({ ...SessionSettings, store: StoreSessionsMongo }))
ServerApp.use('/backend/api/rest/ufostartserver/node/route/fetch/axios', routes)

export default ServerApp;