import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import express from 'express'
import BodyParser from 'body-parser'
import Session from 'express-session'
import CookieParser from 'cookie-parser'
import RateLimit from 'express-rate-limit'
import routes from './Routes/api.routes.js'
import FileUpload from 'express-fileupload'

import { CorsOptions, HelmetConfig, LimiterConfig, SessionConfig } from './Config.js'
import GetMongoConnection from './Connection/GetMongoConnection.js'

const Application = express()

GetMongoConnection()

//Config App
Application.use(morgan('dev'))
Application.use(CookieParser())
Application.use(cors(CorsOptions))
Application.disable('x-powered-by')
Application.use(helmet(HelmetConfig))
Application.use(Session(SessionConfig))
Application.use(RateLimit(LimiterConfig))
Application.use(BodyParser.json({ limit: '100mb', extended: true }))
Application.use(BodyParser.urlencoded({ limit: '100mb', extended: true }))
Application.use(FileUpload({ useTempFiles: true, tempFileDir: './Resources' }))
Application.use('/backend/api/rest/server/ecommerce/route/fetch/axios', routes)

Application.get('/', (req, res) => { res.send("hello server ecommerce-node-app") })

export default function (req, res) { Application(req, res) };