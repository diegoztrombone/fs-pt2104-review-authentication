const checkFields = require('../../middleware/checkFields')
const router = require('express').Router()

module.exports = db => {
    router.post('/signup', checkFields(['username', 'email', 'password']), require('./singup')(db))
    router.post('/login', checkFields(['email', 'password']), require('./login')(db))
    return router
}