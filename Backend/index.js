import express from 'express'
import Application from './Sources/Application.js'
import { ConfigHttps, Port, Server } from './Sources/Config.js'

const server = express()

server.use(Application)
server.listen(Port, () => { Server(`is running on port: ${Port}`) })