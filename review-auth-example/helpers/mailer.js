const transporter = require('../configs/mailer')

const templateFactory = ({ to, confirmationToken }) => ({
  from: `"🎮" <${process.env.MAIL_USER}>`,
  to,
  subject: 'Confirmation!',
  html: `
    <h3>Gracias por registrarte!</h3>
    <p>Para poder acceder a la web, por favor, haz click
      <a href="http://localhost:3000/auth/confirmation/${confirmationToken}">
        aquí
      </a>
    </p>
  `
})

const send = async ({ to, confirmationToken }) => {
  const template = templateFactory({ to, confirmationToken })
  return await transporter.sendMail(template)
}

module.exports = {
  send,
}