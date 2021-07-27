const { sql } = require('slonik')

const createUser = async (db, { email, username, hash }) => {
  try {
    return await db.query(sql`
      INSERT INTO users (
        email, username, hash
      ) VALUES (
        ${email}, ${username}, ${hash}
      );
    `)
  } catch (error) {
    console.info('> error at "createUser" query: ', error.message)
    return false
  }
}

const getUser = async (db, { email }, comparationFn) => {
  try {
    const result = await db.maybeOne(sql`
      SELECT email, username, hash
      FROM users
      WHERE email LIKE ${email};
    `)

    if (!result) {
      throw new Error('invalid credentials')
    }

    const isValidPassword = await comparationFn(result.hash)

    if (!isValidPassword) {
      throw new Error('invalid credentials')
    }

    return result
  } catch (error) {
    console.info('> error at "getUser" query: ', error.message)
    return false
  }
}

module.exports = {
  createUser,
  getUser,
}