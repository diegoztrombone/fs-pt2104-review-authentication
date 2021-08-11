const { createUser } = require('../../queries/auth')

const { hash } = require('../../helpers')


module.exports = db => async (req, res, next) => {
    const { username, email, password, birthdate, bio } = req.body

    const hashed = await hash.encrypt(password)

    const result = await createUser(db, { username, email, hashed, birthdate, bio })

    if (result === false) {
        return next({ error: new Error('Cant create a user') })
    }
    res.status(200).json({
        success: true,
        info: "TODO OK"
    })
}