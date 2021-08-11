const bcrypt = require('bcrypt')

const encrypt = async password => {
    const rounds = process.env.SALT
    const salt = await bcrypt.genSalt(parseInt(rounds))
    return await bcrypt.hash(password, salt)
}

const compare = password => async hash => {
    return await bcrypt.compare(password, hash)
}

module.exports = {
    encrypt,
    compare
}