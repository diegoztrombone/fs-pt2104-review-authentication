const { create, clear } = require('./cookies')
const { encrypt, compare } = require('./hash')
const { toJWT, fromJWT } = require('./jwt')

const serialize = (res, { email, username }) => {
    const accessToken = toJWT(email, username)
    create(res, accessToken)

}

const deserialize = () => {

}

module.exports = {
    cookies: { create, clear },
    hash: { encrypt, compare },
    jwt: { toJWT, fromJWT },
    serialize,
    deserialize,
}