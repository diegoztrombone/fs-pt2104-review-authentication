const router = require('express').Router()

module.exports = db => {
  const auth = require('./auth')
  const user = require('./user')

  router.use('/auth', auth(db))
  router.use('/user', user(db))

  return router
}