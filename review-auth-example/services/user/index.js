const router = require('express').Router()
const authorizer = require('../../middlewares/authorizer')
const multer = require('../../configs/multer')

module.exports = db => {
  const profile = require('./profile')
  const update = require('./update')

  router.get('/', authorizer, profile(db))
  router.put('/', authorizer, multer.single('profilePic'), update(db))

  return router
}