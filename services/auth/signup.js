const { createUser } = require('../../queries/auth')
const { encrypt } = require('../../helpers/hash')

module.exports = db => async (req, res, next) => {
  const { email, username, password } = req.body

  if (!email || !username || !password) {
    return next({ error: new Error('all fields are mandatory') })
  }

  const hash = await encrypt(password)

  const result = await createUser(db, { email, username, hash })

  if (result === false) {
    return next({ error: new Error('something went wrong') })
  }

  res.status(200).json({
    success: true,
  })
}