const { checkUser, passwordToken } = require('../../queries/auth')
const { mailer, hash } = require('../../helpers')
module.exports = db => async (req, res, next) => {
    const { email, username } = req.body
    const user = await checkUser(db, { email, username })
    if (user === false) {
        return next({ error: new Error('User not found') })
    }
    const token = hash.createConfirmToken()
    const newToken = await passwordToken(db, {email: user.email, token})
    const mail = await mailer.newPasswordMail({to: user.email, token})
    res.status(200).json({
        success: true,
        data: `Update email has been sent`
    })
}