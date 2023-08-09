import mongoose from 'mongoose'
import { ConnectionCloud } from '../Config.js'

export default function GetMongoConnection() {
  mongoose.set('strictQuery', true)
  mongoose.connect(ConnectionCloud)
  mongoose.connection.on('open', () => {
    console.log("Connection to Database succes.")
  })
  mongoose.connection.on('error', err => {
    console.error(err)
  })
}