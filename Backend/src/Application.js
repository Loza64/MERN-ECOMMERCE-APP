import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import bodyparser from 'body-parser'
import routes from './Routes/api.routes.js'
import fileupload from 'express-fileupload'
import { Origin, SessionServer } from './Settings.js'
import GetMongoConnection from './Connection/GetMongoConnection.js'

const ServerApp = express()

GetMongoConnection()
ServerApp.use(morgan('dev'))
ServerApp.use(SessionServer)
ServerApp.use(cors({ origin: Origin, credentials: true }))
ServerApp.use(bodyparser.json({ limit: '100mb', extended: true }))
ServerApp.use(bodyparser.urlencoded({ limit: '100mb', extended: true }))
ServerApp.use(fileupload({ useTempFiles: true, tempFileDir: './Resources' }))
ServerApp.use('/backend/api/rest/ufostartserver/node/route/fetch/axios', routes)

export default ServerApp;