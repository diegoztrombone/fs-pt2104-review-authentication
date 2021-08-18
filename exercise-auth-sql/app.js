require('dotenv').config()

const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')

const db = require('./configs/db')

const { PORT } = require('./constants')

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(require('./services')(db))

app.use('/', (req, res, next) => {
    next({ statuscode: 400, error: new Error('Invalid route') })
})

app.use(({ statuscode = 400, error }, req, res, next) => {
    res.status(statuscode).json({
        success: false,
        info: error.message
    })
})
app.listen(PORT, () => {
    console.info(`Server stated at port ${PORT}`)
})