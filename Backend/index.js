import express from 'express'
//import { createServer } from 'https'
import Application from './Sources/Application.js'
import { ConfigHttps, Port, Server } from './Sources/Config.js'

//const server = createServer(ConfigHttps, Application)
const app = express()
app.use(Application)

//server.listen(Port, () => { Server(`is running on port: ${Port}`) })

app.listen(Port, () => { Server(`is running on port: ${Port}`) })