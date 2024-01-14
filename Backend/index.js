import debug from 'debug'
import { createServer } from 'https'
import { ConfigHttps, PORT } from './config.js'
import Application from './Sources/Application.js'

const Server = debug('backend:[Server]')
const Https = createServer(ConfigHttps, Application)

Https.listen(PORT, () => { Server(`is running on port: ${PORT}`) })