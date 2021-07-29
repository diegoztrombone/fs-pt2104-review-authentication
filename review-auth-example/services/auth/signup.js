const { createUser } = require('../../queries/auth')
const { encrypt, createConfirmToken } = require('../../helpers/hash')
const { mailer } = require('../../helpers')

module.exports = db => async (req, res, next) => {
  const { email, username, password } = req.body

  if (!email || !username || !password) {
    return next({ error: new Error('all fields are mandatory') })
  }

  const hash = await encrypt(password)

  const confirmationToken = createConfirmToken()

  const result = await createUser(
    db,
    { email, username, hash, confirmationToken },
  )

  if (result === false) {
    return next({ error: new Error('something went wrong') })
  }

  const mailResult = await mailer.send({ to: email, confirmationToken })

  console.info('> mail result: ', mailResult)

  res.status(200).json({
    success: true,
    data: {
      info: 'message sent succesfully'
    }
  })
}