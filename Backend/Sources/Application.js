import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import bodyparser from 'body-parser'
import CookieParser from 'cookie-parser'
import routes from './Routes/api.routes.js'
import fileupload from 'express-fileupload'
import { CorsOptions, SessionApp } from './Config.js'
import GetMongoConnection from './Connection/GetMongoConnection.js'

const Application = express()

//Config app
GetMongoConnection()
Application.use(SessionApp)
Application.use(morgan('dev'))
Application.use(CookieParser())
Application.use(cors(CorsOptions))
Application.use(bodyparser.json({ limit: '100mb', extended: true }))
Application.use(bodyparser.urlencoded({ limit: '100mb', extended: true }))
Application.use(fileupload({ useTempFiles: true, tempFileDir: './Resources' }))
Application.use('/backend/api/rest/ufostartserver/node/route/fetch/axios', routes)

export default Application;