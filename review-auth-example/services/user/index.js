const router = require('express').Router()
const authorizer = require('../../middlewares/authorizer')

module.exports = db => {
  const profile = require('./profile')

  router.get('/', authorizer, profile(db))

  return router
}