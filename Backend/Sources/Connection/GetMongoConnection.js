import mongoose from 'mongoose'
import { ConnectionCloud, Database, Error } from '../Config.js'

export default function GetMongoConnection() {
  mongoose.connect(ConnectionCloud, { connectTimeoutMS: 1000 * 60 * 5 })
  mongoose.connection.on('error', err => { Error(err.message); console.log(err.message) })
  mongoose.connection.on('disconnected', () => { Error('Database connection disconnected') })
  mongoose.connection.on('open', () => { Database(`${mongoose.connection.name} connection success`) })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      Database('Mongoose default connection disconnected through app termination')
      console.log('Mongoose default connection disconnected through app termination')
      process.exit(0);
    });
  });
}