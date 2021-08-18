const router = require('express').Router()

module.exports = db => {
    router.get('/', require('./profile')(db))
    router.post('/logout', require('./logout')(db))

    return router
}