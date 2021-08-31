const router = require('express').Router()
const checkDeleted  = require('../../middleware/checkDeleted')
const multer  = require('../../configs/multer')

module.exports = db => {
    router.get('/', checkDeleted(db), require('./profile')(db))
    router.post('/logout', require('./logout')(db))
    router.put('/update', checkDeleted(db), multer.single('profilePic'), require('./update')(db))
    router.patch('/update/password', checkDeleted(db), require('./updatePassword')(db))
    router.patch('/disable', checkDeleted(db), require('./disable')(db))
    router.patch('/enable', require('./enable')(db))
    return router
} 