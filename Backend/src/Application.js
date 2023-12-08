//import path from 'path'
import cors from 'cors'
import express from 'express'
//import { fileURLToPath } from 'url'
import bodyparser from 'body-parser'
import routes from './Routes/api.routes.js'
import fileupload from 'express-fileupload'
import GetMongoConnection from './Connection/GetMongoConnection.js'
import { Origin } from './SettingsEnv.js'
import morgan from 'morgan'

const ServerApp = express()
//const __filename = fileURLToPath(import.meta.url)
//const __dirname = path.dirname(__filename)

//Configuration app
GetMongoConnection()
ServerApp.use(morgan('dev'))
ServerApp.use(cors({ origin: Origin, credentials: true }))
ServerApp.use(bodyparser.json({ limit: '100mb', extended: true }))
ServerApp.use(bodyparser.urlencoded({ limit: '100mb', extended: true }))
ServerApp.use(fileupload({ useTempFiles: true, tempFileDir: './Resources' }))
ServerApp.use('/backend/api/rest/ufostartserver/node/route/fetch/axios', routes)

//Get files statics from Frontend
//ServerApp.use(express.static(path.join(__dirname, '../Frontend/dist')))
//ServerApp.get('*', (req, res) => res.sendFile(path.join(__dirname, '../Frontend/dist/index.html')))

export default ServerApp;