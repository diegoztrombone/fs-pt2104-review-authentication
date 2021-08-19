const router = require('express').Router()
const authorizer = require('../middleware/authorized')

module.exports = db => {
    router.use('/auth', require('./auth')(db))
    router.use('/user', authorizer, require('./user')(db))
    return router
}