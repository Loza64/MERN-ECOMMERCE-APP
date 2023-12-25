import debug from 'debug'
import { createServer } from 'https'
import Application from './src/Application.js'
import { OptionsHttp, PORT } from './src/Settings.js'

const Server = debug('backend:[Server]')
const Https = createServer(OptionsHttp, Application)

Https.listen(PORT, () => { Server(`is running on port: ${PORT}`) })