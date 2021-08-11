const router = require('express').Router()

module.exports = db => {
    router.get('/', require('./profile')(db))

    return router
}