import { createServer } from 'https'
import Application from './Sources/Application.js'
import { ConfigHttps, Port, Server } from './Sources/Config.js'

const server = createServer(ConfigHttps, Application)

server.listen(Port, () => { Server(`is running on port: ${Port}`) })