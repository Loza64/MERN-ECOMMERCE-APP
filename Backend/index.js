import debug from 'debug'
import { createServer } from 'http'
import { PORT } from './src/Settings.js'
import Application from './src/Application.js'

const Server = debug('backend:[Server]')
const Http = createServer(Application)

Http.listen(PORT, () => { Server(`is running on port: ${PORT}`) })