//import { createServer } from 'https'
import { createServer } from 'http'
import Application from './Sources/Application.js'
import { ConfigHttps, Port, Server } from './Sources/Config.js'

//const server = createServer(ConfigHttps, Application)
const server = createServer(Application)

server.listen(Port, () => { Server(`is running on port: ${Port}`) })