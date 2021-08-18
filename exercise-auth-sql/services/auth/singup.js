const { createUser } = require('../../queries/auth')

const { hash, mailer } = require('../../helpers')


module.exports = db => async (req, res, next) => {
    const { username, email, password, birthdate, bio } = req.body

    const hashed = await hash.encrypt(password)

    const confirmationToken = hash.createConfirmToken()

    const result = await createUser(db, { username, email, hash: hashed, confirmationToken, birthdate, bio })

    if (result === false) {
        return next({ error: new Error('Cant create a user') })
    }

    const mail = await mailer.sendMail({to: email, confirmationToken})

    res.status(200).json({
        success: true,
        info: "message sent succesfully"
    })
}