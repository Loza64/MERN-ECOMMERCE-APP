import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import express from 'express'
import bodyparser from 'body-parser'
import CookieParser from 'cookie-parser'
import routes from './Routes/api.routes.js'
import fileupload from 'express-fileupload'
import { ConfigHsts, CorsOptions, SessionApp } from './Config.js'
import GetMongoConnection from './Connection/GetMongoConnection.js'

const Application = express()

GetMongoConnection()

//Config App
Application.use(SessionApp)
Application.use(morgan('dev'))
Application.use(CookieParser())
Application.use(cors(CorsOptions))

// Config helmet
Application.use(helmet.xssFilter()) //Protection with xss atacks
Application.use(helmet.hsts(ConfigHsts)) //Config Hsts 
Application.use(helmet.frameguard({ action: 'deny' })) // Not iframe html
Application.use(helmet.dnsPrefetchControl({ allow: false })) //Dont pre resolve domains
Application.use(helmet.referrerPolicy({ policy: 'no-referrer' })) //Dont send references

//Config route
Application.use(bodyparser.json({ limit: '100mb', extended: true }))
Application.use(bodyparser.urlencoded({ limit: '100mb', extended: true }))
Application.use(fileupload({ useTempFiles: true, tempFileDir: './Resources' }))
Application.use('/backend/api/rest/ufostartserver/node/route/fetch/axios', routes)

Application.get('/', (req, res) => { res.send("hello server ecommerce-node-app") })

export default function (req, res) { Application(req, res) };