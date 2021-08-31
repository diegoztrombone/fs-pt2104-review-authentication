const { create, clear } = require('./cookies')
const { encrypt, compare, createConfirmToken } = require('./hash')
const { toJWT, fromJWT } = require('./jwt')
const { sendMail, loginMail, newPasswordMail } = require('./mailer')
const { upload } = require('./cloudinary')
const serialize = (res, { email, username, active }) => {
    const accessToken = toJWT(email, username, active)
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
    mailer: { sendMail, loginMail, newPasswordMail },
    cloudinary: {upload},
    serialize,
    deserialize,
    sendMail,
}