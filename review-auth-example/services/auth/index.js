const router = require('express').Router()
const authorizer = require('../../middlewares/authorizer')

module.exports = db => {
  const signin = require('./signin')
  const signup = require('./signup')
  const signout = require('./signout')
  const confirm = require('./confirm')

  router.post('/signin', signin(db))
  router.post('/signup', signup(db))
  router.post('/signout', authorizer, signout())
  router.get('/confirmation/:confirmationToken', confirm(db))

  return router
}