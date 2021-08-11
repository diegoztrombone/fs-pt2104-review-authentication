const { createUser } = require('../../queries/auth')
const { encrypt } = require('../../helpers/hash')

module.exports = db => async (req, res, next) => {
    const { username, email, password, birthdate, bio } = req.body

    const hash = await encrypt(password)

    const result = await createUser(db, { username, email, hash, birthdate, bio })

    if (result === false) {
        return next({ error: new Error('Cant create a user') })
    }
    res.status(200).json({
        success: true,
        info: "TODO OK"
    })
}