const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { SALT } = require('../constants')

const encrypt = async password => {
    const rounds = SALT
    const salt = await bcrypt.genSalt(parseInt(rounds))
    return await bcrypt.hash(password, salt)
}

const compare = password => async hash => {
    return await bcrypt.compare(password, hash)
}

const createConfirmToken = () => {
    return crypto.randomBytes(32).toString('hex')
}
module.exports = {
    encrypt,
    compare,
    createConfirmToken,
}