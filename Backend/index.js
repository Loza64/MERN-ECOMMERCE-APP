import debug from 'debug'
import { createServer } from 'https'
import Application from './Sources/Application.js'
import { OptionsHttps, PORT } from './Sources/Settings.js'

const Server = debug('backend:[Server]')
const Http = createServer(OptionsHttps, Application)

Http.listen(PORT, () => { Server(`is running on port: ${PORT}`) })