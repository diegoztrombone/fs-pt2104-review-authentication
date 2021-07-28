const router = require('express').Router()

module.exports = db => {
  const signin = require('./signin')
  const signup = require('./signup')

  router.post('/signin', signin(db))
  router.post('/signup', signup(db))

  return router
}