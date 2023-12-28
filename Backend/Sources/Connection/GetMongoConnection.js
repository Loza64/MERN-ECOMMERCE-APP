import debug from 'debug'
import mongoose from 'mongoose'
import { ConnectionCloud } from '../Settings.js'

const success = debug('backend:[Successful]')
const error = debug('backend:[Failure]')

export default function GetMongoConnection() {
  mongoose.connect(ConnectionCloud, { connectTimeoutMS: 1000 * 60 * 5 })
  mongoose.connection.on('error', err => { error(err.message); console.log(err.message) })
  mongoose.connection.on('disconnected', () => { error('Database connection disconnected') })
  mongoose.connection.on('open', () => { success(`${mongoose.connection.name} database connection`) })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      success('Mongoose default connection disconnected through app termination')
      console.log('Mongoose default connection disconnected through app termination')
      process.exit(0);
    });
  });
}