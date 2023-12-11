import debug from 'debug'
import express from 'express'
import { PORT } from './src/Settings.js'
import ServerApp from './src/Application.js'

const App = express()
const server = debug('backend:[Server]');

App.use(ServerApp)
App.listen(PORT, () => { server(`is running on port: ${PORT}`) })