import debug from 'debug'
import { createServer } from 'https'
import Application from './Sources/Application.js'
import { OptionsHttps, PORT } from './config.js'

const Server = debug('backend:[Server]')
const Https = createServer(OptionsHttps, Application)

Https.listen(PORT, () => { Server(`is running on port: ${PORT}`) })