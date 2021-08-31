const { sql } = require('slonik')

const getProfile = async (db, { email }) => {
    try {
        const result = await db.maybeOne(sql`
        SELECT 
            email, username, profile_pic, 
            EXTRACT(YEAR from AGE(NOW(), birthdate)) as "age", bio
            created_at, updated_at, active
        FROM users
        WHERE email LIKE ${email}
        `)
        if (!result) {
            throw new Error('User not found')
        }
        return result
    } catch (error) {
        console.info('> error at "getProfile" query: ', error.message)
        return false
    }
}

const updateProfile = async (
    db,
    { email, username },
    { newUsername },
    uploadFn
) => {
    try {
        return await db.transaction(async tx => {
            const user = await getProfile(tx, { email })

            if (!user) {
                throw new Error('User not found')
            }

            const updateUser = await tx.maybeOne(sql`
            UPDATE users
            SET 
                username = ${newUsername || username},
                updated_at = now()

            WHERE email LIKE ${email}
            `)

            const imgFn = await uploadFn(user.id)

            const updateImg = await tx.maybeOne(sql`
            UPDATE users
            SET 
                profile_pic = ${imgFn.url || null},
                updated_at = now()
            WHERE email LIKE ${email}`)
            
            return await getProfile(tx, { email })
        })

    } catch (error) {
        console.info('> error at "updateProfile" query: ', error.message)
        return false
    }
}
const updatePassword = async (db, { email, password }, fn) => {
    try {
        return await db.transaction(async tx => {
            const result = await tx.maybeOne(sql`
        SELECT hash
        FROM users
        WHERE email LIKE ${email}
        `)

            const isValidPassword = await fn(result.hash)

            if (!isValidPassword) {
                throw new Error('Invalid Password')
            }
            const update = await tx.maybeOne(sql`
        UPDATE users
        SET 
            hash = ${password}
            
        WHERE email LIKE ${email}
        
        `)
            return true
        })
    } catch (error) {
        console.info('> error at "updatePassword" query: ', error.message)
        return false
    }
}

const getDisabled = async (db, { email }) => {
    try {
        const result = await db.query(sql`
     UPDATE users
     SET deleted = true
     WHERE email LIKE ${email}
     `)
        if (!result) {
            throw new Error('User not found')
        }

        return true

    } catch (error) {
        console.info('> error at "getDisabled" query: ', error.message)
        return false
    }
}

const getEnabled = async (db, { email }) => {
    try {
        const result = await db.query(sql`
        UPDATE users
        SET deleted = false
        WHERE email LIKE ${email}
        `)
        if (!result) {
            throw new Error('User not found')
        }

        return true

    } catch (error) {
        console.info('> error at "getEnabled" query: ', error.message)
        return false
    }
}

module.exports = {
    getProfile,
    updateProfile,
    updatePassword,
    getDisabled,
    getEnabled,
}