const jwt = require('jsonwebtoken')


const toJWT = (email, username, active) => {
    return jwt.sign({ email, username, active }, process.env.JWT_SECRET)
}

const fromJWT = accessToken => {
    try {
        return jwt.verify(accessToken, process.env.JWT_SECRET)
        
    } catch (error) {
        console.info('> error at "fromJWT" helper: ', error.message)
        return false
    }
}

module.exports = {
    toJWT,
    fromJWT,
}