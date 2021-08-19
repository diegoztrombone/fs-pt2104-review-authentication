const { sql } = require('slonik')

const createUser = async (db, { username, email, hash, confirmationToken, birthdate, bio }) => {
  try {
    return await db.query(sql`
        INSERT INTO users (
          email, username, hash, birthdate, bio, confirmation_token
        ) VALUES (
          ${email}, ${username}, ${hash}, ${birthdate}, ${bio}, ${confirmationToken}
        );
      `)
  } catch (error) {
    console.info('> error at "createUser" query: ', error.message)
    return false
  }
}

const checkUser = async (db, { email, username }) => {
  try {
    let subquery
    email ? subquery = sql`email LIKE ${email}` : subquery = sql`username LIKE ${username}`
    const result = await db.maybeOne(sql`
      SELECT email, username
      FROM users
      WHERE 
        ${subquery} AND
        active = true
    `)

    if (!result) {
      throw new Error('User not found')
    }

    return result
  } catch (error) {
    console.info('> error at "checkUser" query: ', error.message)
    return false
  }
}

const getUser = async (db, { email, username }, fn) => {
  try {
    let subquery
    email ? subquery = sql`email LIKE ${email}` : subquery = sql`username LIKE ${username}`
    const result = await db.maybeOne(sql`
      SELECT email, username, hash, active
      FROM users
      WHERE 
        ${subquery} AND 
        active = true;
    `)
    if (!result) {
      throw new Error('Invalid credentials')
    }

    const isValidPassword = await fn(result.hash)

    if (!isValidPassword) {
      throw new Error('Invalid credentials')
    }

    return result
  } catch (error) {
    console.info('> error at "getUser" query: ', error.message)
    return false
  }

}
const confirmUser = async (db, { confirmationToken }) => {
  try {
    const result = await db.query(sql`
    UPDATE users
    SET 
      active = true,
      confirmation_token = null
    WHERE confirmation_token LIKE ${confirmationToken};
    `)
    if (!result.rowCount) {
      throw new Error('Invalid Token')
    }
    return result
  } catch (error) {
    console.info('> error at "confirmUser" query: ', error.message)
    return false
  }
}

const confirmProfile = async (db, { confirmationToken }) => {
  try {
    return await db.maybeOne(sql`
      SELECT email, username
      FROM users
      WHERE
       confirmation_token LIKE ${confirmationToken};`)
  } catch (error) {
    console.info('> error at "confirmProfile" query: ', error.message)
    return false
  }
}

const passwordToken = async (db, { email, token }) => {
  try {
    const result = await db.query(sql`
    UPDATE users
    SET 
      password_token = ${token}
    WHERE 
      email LIKE ${email} AND
      active = true;
    `)
    if (!result.rowCount) {
      throw new Error('Password cant been updated')
    }
    return result

  } catch (error) {
    console.info('> error at "passwordToken" query: ', error.message)
    return false
  }


}

const setNewPass = async (db, { token, email, password }) => {
  try {
    const result = await db.query(sql`
    UPDATE users
    SET 
      hash = ${password},
      password_token = null
    WHERE
      password_token = ${token} AND
      email = ${email}
    `)
    if (!result.rowCount) {
      throw new Error('Password cant been updated')
    }
    return result
  } catch (error) {
    console.info('> error at "setNewPass" query: ', error.message)
    return false
  }

}
module.exports = {
  createUser,
  getUser,
  checkUser,
  confirmUser,
  confirmProfile,
  passwordToken,
  setNewPass,
}