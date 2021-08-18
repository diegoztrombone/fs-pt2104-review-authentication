const slonik = require('slonik')
const { SLONIK_URL } = require('../constants')

module.exports = slonik.createPool(SLONIK_URL)