const router = require('express').Router()
const checkDeleted  = require('../../middleware/checkDeleted')

module.exports = db => {
    router.get('/', checkDeleted(db), require('./profile')(db))
    router.post('/logout', require('./logout')(db))
    router.patch('/update/password', checkDeleted(db), require('./updatePassword')(db))
    router.patch('/disable', require('./disable')(db))
    router.patch('/enable', require('./enable')(db))
    return router
}