const checkFields = require('../../middleware/checkFields')
const router = require('express').Router()

module.exports = db => {
    router.post('/signup', checkFields(['username', 'email', 'password']), require('./singup')(db))
    router.post('/login', checkFields(['password']), require('./login')(db))
    router.get('/confirmation/:confirmationToken', require('./confirmation')(db))
    router.post('/password/reset', require('./newPassword')(db))
    router.post('/password/request', require('./passwordRequest')(db))  
    return router
}