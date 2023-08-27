import path from 'path'
import cors from 'cors'
import express from 'express'
import { fileURLToPath } from 'url'
import bodyparser from 'body-parser'
import { NODE_ENV } from './Config.js'
import routes from './Routes/api.routes.js'
import fileupload from 'express-fileupload'
import GetMongoConnection from './Connection/MongoDB.js'

const ServerApp = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

GetMongoConnection()
ServerApp.use(cors())
ServerApp.use(bodyparser.json())
ServerApp.use(bodyparser.urlencoded({ extended: true }))
ServerApp.use(fileupload({ useTempFiles: true, tempFileDir: './Resources' }))
ServerApp.use('/API/REST/ECOMMERCE/SERVER/NODE/ROUTE', routes)

if (NODE_ENV === "productions") {
    ServerApp.use(express.static(path.join(__dirname, '../Frontend/dist')))
    ServerApp.get('*', (req, res) => res.sendFile(path.join(__dirname, '../Frontend/dist/index.html')))
} else {
    ServerApp.get('/', (req, res) => res.send("La pagina esta en mantenimiento, vuelve mas tarde"))
}

export default ServerApp;