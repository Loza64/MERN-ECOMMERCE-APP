import { createServer } from 'http'
// import { createServer } from 'https'
import Application from './Sources/Application.js'
import { ConfigHttps, Port, Server } from './Sources/Config.js'

const https = createServer(Application)
//const https = createServer(ConfigHttps, Application)

https.listen(Port, () => { Server(`is running on port: ${Port}`) })