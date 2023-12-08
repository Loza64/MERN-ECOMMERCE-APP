import debug from 'debug'
import mongoose from 'mongoose'
import { ConnectionCloud } from '../SettingsEnv.js'

const database = debug('backend:mongodb')
const error = debug('backend:error')

export default function GetMongoConnection() {
  mongoose.set('strictQuery', true)
  mongoose.connect(ConnectionCloud)
  mongoose.connection.on('open', () => { database("connection succes.") })
  mongoose.connection.on('error', err => { error(err.message) })
}
