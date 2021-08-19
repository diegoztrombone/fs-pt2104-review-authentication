const { hash } = require('../../helpers')
const { updatePassword } = require('../../queries/user')

module.exports = db => async (req, res, next) => {
    const { oldPassword, newPassword } = req.body
    if (oldPassword === newPassword) {
        return next({error: new Error('New password must be different')})
    }
    const { email } = res.locals.user
    const hashed = await hash.encrypt(newPassword)
    const update = await updatePassword(db, { email, password: hashed }, hash.compare(oldPassword))
    if (update === false) {
        return next({ error: new Error('Something went wrong') })
    }

    res.status(200).json({
        success: true,
        data: "Password has been updated"
    })
}