require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const db = require('./configs/db')

const app = express()
app.use(express.json())
app.use(cookieParser())

const main = require('./services')

app.use(main(db))

app.use((req, res, next) => {
  next({ error: new Error('path not found') })
})

app.use(({ statusCode = 400, error }, req, res, next) => {
  res.status(statusCode).json({
    success: false,
    message: error.message,
  })
})

app.listen(3000, () => {
  console.info('> listening at: http://localhost:3000')
})