const { getUser } = require('../../queries/auth')
const { compare } = require('../../helpers/hash')
const { serialize } = require('../../helpers')

module.exports = db => async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next({ error: new Error('all fields are mandatory') })
  }

  const result = await getUser(db, { email }, compare(password))

  console.info('> result: ', result)

  if (result === false) {
    return next({ error: new Error('something went wrong') })
  }

  serialize(res, { email, username: result.username })

  res.status(200).json({
    success: true,
    data: {
      email: result.email,
      username: result.username,
    }
  })
}