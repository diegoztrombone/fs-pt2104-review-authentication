const { hash } = require('../../helpers')
const { setNewPass } = require('../../queries/auth')
module.exports = db => async (req, res, next) => {
    const { token, email } = req.query
    const { newPassword } = req.body

    if (!token || !email || !newPassword) {
        return next({ error: new Error('Something went wrong') })
    }
    const hashed = await hash.encrypt(newPassword)
    const update = await setNewPass(db, { token, email, password: hashed })

    if (update === false) {
        return next({ error: new Error('Something went wrong') })
    }
    res.status(200).json({
        success: true,
        info: "Password has been updated succesfully"
    })
}