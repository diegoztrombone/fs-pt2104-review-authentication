const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants')


const toJWT = (email, username, active) => {
    return jwt.sign({ email, username, active }, JWT_SECRET)
}

const fromJWT = accessToken => {
    try {
        return jwt.verify(accessToken, JWT_SECRET)
        
    } catch (error) {
        console.info('> error at "fromJWT" helper: ', error.message)
        return false
    }
}

module.exports = {
    toJWT,
    fromJWT,
}