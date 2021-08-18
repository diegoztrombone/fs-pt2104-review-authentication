const nodemailer = require('nodemailer')
const { MAIL_USER, MAIL_PASS } = require('../constants')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
    }
})

module.exports = transporter