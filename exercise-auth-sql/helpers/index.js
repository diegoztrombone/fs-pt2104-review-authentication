const { create, clear } = require('./cookies')
const { encrypt, compare, createConfirmToken } = require('./hash')
const { toJWT, fromJWT } = require('./jwt')
const { sendMail } = require('./mailer')

const serialize = (res, { email, username }) => {
    const accessToken = toJWT(email, username)
    create(res, accessToken)

}

const deserialize = req => {
    const { token } = req.cookies
    return fromJWT(token)
}

module.exports = {
    cookies: { create, clear },
    hash: { encrypt, compare, createConfirmToken },
    jwt: { toJWT, fromJWT },
    serialize,
    deserialize,
    sendMail,
}