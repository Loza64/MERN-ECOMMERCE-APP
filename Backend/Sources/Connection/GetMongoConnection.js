import mongoose from 'mongoose'
import { ConnectionCloud, Database, Error } from '../Config.js'

export default function GetMongoConnection() {
  try {
    mongoose.connect(ConnectionCloud)
    Database("connection success")
  } catch ({message}) {
    Error(message)
    console.error(message)
  }
}