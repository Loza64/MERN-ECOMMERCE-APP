import debug from 'debug'
import mongoose from 'mongoose'
import { ConnectionCloud } from '../Settings.js'

const database = debug('backend:mongodb')
const error = debug('backend:[Error]')

export default function GetMongoConnection() {
  mongoose.set('strictQuery', true)
  mongoose.connect(ConnectionCloud)
  mongoose.connection.on('open', () => { database("connection succes.") })
  mongoose.connection.on('error', err => { error(err.message) })
}
