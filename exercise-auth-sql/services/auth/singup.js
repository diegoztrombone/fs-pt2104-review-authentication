const { createUser } = require('../../queries/auth')

module.exports = db => async (req, res, next) => {
    const { username, email, hash, birthdate, bio } = req.body
    if (!username || !email || !hash) {
        return next({error: new Error('All fields are mandatory')})
    }
    const result = await createUser(db, { username, email, hash, birthdate, bio })

    if (result === false) {
        return next({ error: new Error('Cant create a user')})
    }
    res.status(200).json({
        success: true,
        info: "TODO OK"
    })
}