import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import express from 'express'
import bodyparser from 'body-parser'
import CookieParser from 'cookie-parser'
import routes from './Routes/api.routes.js'
import fileupload from 'express-fileupload'
import rateLimit from 'express-rate-limit'
import { CorsOptions, HelmetConfig, LimiterConfig, SessionApp } from './Config.js'
import GetMongoConnection from './Connection/GetMongoConnection.js'

const Application = express()

GetMongoConnection()

//Config App
Application.use(SessionApp)
Application.use(morgan('dev'))
Application.use(CookieParser())
Application.use(cors(CorsOptions))
Application.disable('x-powered-by')
Application.use(helmet(HelmetConfig))
Application.use(rateLimit(LimiterConfig))
Application.use(bodyparser.json({ limit: '100mb', extended: true }))
Application.use(bodyparser.urlencoded({ limit: '100mb', extended: true }))
Application.use(fileupload({ useTempFiles: true, tempFileDir: './Resources' }))
Application.use('/backend/api/rest/ufostartserver/node/route/fetch/axios', routes)

Application.get('/', (req, res) => { res.send("hello server ecommerce-node-app") })

export default function (req, res) { Application(req, res) };