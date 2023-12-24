import debug from 'debug'
import express from 'express'
import { createServer } from 'http'
import { PORT } from './src/Settings.js'
import ServerApp from './src/Application.js'

const message = debug('backend:[Server]')
const ServerHttp = createServer(express().use(ServerApp))

ServerHttp.listen(PORT, () => { message(`is running on port: ${PORT}`) })