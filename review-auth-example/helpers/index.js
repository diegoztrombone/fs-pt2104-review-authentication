const { create, clear } = require('./cookies')
const { encrypt, compare } = require('./hash')
const { toJWT, fromJWT } = require('./jwt')
const { upload, genDataURI } = require('./cloudinary')
const { send } = require('./mailer')

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
  hash: { encrypt, compare },
  jwt: { toJWT, fromJWT },
  cloudinary: { upload, genDataURI },
  mailer: { send },
  serialize,
  deserialize,
}