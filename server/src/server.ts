import express, { Express } from 'express'
import * as bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
const morgan = require('morgan')
import path from 'path'
import jwt from 'express-jwt'
import cors from 'cors'
import router from './routes/routes'
import shoeRouter from './routes/routes'

require('dotenv').config()
const app: Express = express()

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      return callback(null, true)
    }
  })
)

app.use(morgan(':method :status :response-time ms'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(process.env.DB_CONNECT || '', { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose.connection.on('connected', () => {
  console.log('Mongo Connected')
})

if (!process.env.PRIVATE) {
  throw new Error('Private env key not set')
}
const auth = jwt({
  secret: process.env.PRIVATE,
  algorithms: ['HS256'],
  credentialsRequired: false
})

app.use(auth)
app.use(router)
app.use(shoeRouter)

app.use(express.static(path.join(__dirname, '/../../client/build')))

/*
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../client/public/index.html'))
})


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../client/build/index.html'))
})
*/

export default app
