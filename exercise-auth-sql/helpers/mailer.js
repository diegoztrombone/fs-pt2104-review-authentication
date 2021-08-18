const transporter = require('../configs/mailer')

const templateConfirmationToken = ({ to, confirmationToken }) => ({
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

const templateLoginOk = ({ to, user }) => ({
  from: `"🎮" <${process.env.MAIL_USER}>`,
  to,
  subject: 'Registro satisfactorio!',
  html: `
      <h3>El registro del usuario ${user} ha sido satisfactorio</h3>
    `
})

const templateNewPassword = ({ to, token }) => ({
  from: `"🎮" <${process.env.MAIL_USER}>`,
  to,
  subject: 'Reset Password!',
  html: `
      <h3>Cambio de contraseña</h3>
      <p>Para poder cambiar su contraseña, haga click
        <a href="http://localhost:3000/auth/password/request?token=${token}&email=${to}">
          aquí
        </a>
      </p>
    `
})


const sendMail = async ({ to, confirmationToken }) => {
  const template = templateConfirmationToken({ to, confirmationToken })
  return await transporter.sendMail(template)
}

const loginMail = async ({ to, user }) => {
  const template = templateLoginOk({ to, user })
  return await transporter.sendMail(template)
}

const newPasswordMail = async ({ to, token }) => {
  const template = templateNewPassword({ to, token })
  return await transporter.sendMail(template)
}

module.exports = {
  sendMail,
  loginMail,
  newPasswordMail,
}