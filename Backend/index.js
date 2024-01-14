import debug from 'debug'
import { createServer } from 'https'
import Application from './Sources/Application.js'
import { ConfigHttps, PORT } from './config.js'

const Server = debug('backend:[Server]')
const Https = createServer(ConfigHttps, Application)

Https.listen(PORT, () => { Server(`is running on port: ${PORT}`) })