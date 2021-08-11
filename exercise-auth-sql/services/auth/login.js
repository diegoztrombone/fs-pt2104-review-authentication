const { getUser } = require('../../queries/auth')
const { compare } = require('../../helpers/hash')
const { create } = require('../../helpers/cookies')

module.exports = db => async (req, res, next) => {
    const { email, password } = req.body

    const user = await getUser(db, { email }, compare(password))

    if (user === false) {
        return next({ error: new Error('Something went wrong') })
    }

    create(res, 'hola que tal')

      
    res.status(200).json({
        success: true,
        data: {
            email: user.email,
            username: user.username
        }
    })
}