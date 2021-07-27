const { deserialize } = require('../helpers')

module.exports = (req, res, next) => {
  const user = deserialize(req)

  if (user === false) {
    return next({
      statusCode: 401,
      error: new Error('unauthorized')
    })
  }

  res.locals.user = user

  next()
}