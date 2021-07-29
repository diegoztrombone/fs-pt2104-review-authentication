const { confirmUser } = require('../../queries/auth')

module.exports = db => async (req, res, next) => {
  const { confirmationToken } = req.params

  if (!confirmationToken) {
    return next({ error: new Error('something went wrong') })
  }

  const result = await confirmUser(db, { confirmationToken })

  if (result === false) {
    return next({ error: new Error('invalid token') })
  }

  res.status(200).json({
    success: true,
    data: {
      info: 'account activated'
    }
  })
}