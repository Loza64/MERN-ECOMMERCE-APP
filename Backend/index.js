import debug from 'debug'
import { createServer } from 'https'
import Application from './src/Application.js'
import { OptionsHttp, PORT } from './src/Settings.js'

const Server = debug('backend:[Server]')
const Http = createServer(OptionsHttp, Application, (req, res) => res.send(`Hello to server ecommerce`))

Http.listen(PORT, () => { Server(`is running on port: ${PORT}`) })