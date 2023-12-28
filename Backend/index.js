import debug from 'debug'
import { createServer } from 'https'
import Application from './Sources/Application.js'
import { OptionsHttp, PORT } from './Sources/Settings.js'

const Server = debug('backend:[Server]')
const Http = createServer(OptionsHttp, Application)

Http.listen(PORT, () => { Server(`is running on port: ${PORT}`) })