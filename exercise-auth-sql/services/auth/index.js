const router = require('express').Router()

module.exports = db => {
    router.post('/signup', require('./singup')(db))
    router.post('/login', require('./login')(db))
    return router
}