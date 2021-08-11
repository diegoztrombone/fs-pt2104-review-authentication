const { sql } = require('slonik')

const createUser = async (db, { username, email, hashed, birthdate, bio }) => {
  try {
    return await db.query(sql`
        INSERT INTO users (
          email, username, hash, birthdate, bio, active
        ) VALUES (
          ${email}, ${username}, ${hashed}, ${birthdate}, ${bio}, true
        );
      `)
  } catch (error) {
    console.info('> error at "createUser" query: ', error.message)
    return false
  }
}

const getUser = async (db, { email }, fn) => {
  try {
    const result = await db.maybeOne(sql`
      SELECT email, username, hash
      FROM users
      WHERE email LIKE ${email}
    `)

    if (!result) {
      throw new Error('Invalid credentials')
    }

    const isValidPassword = await fn(result.hash)
    
    console.log(isValidPassword)

    if (!isValidPassword) {
      throw new Error('Invalid credentials')
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