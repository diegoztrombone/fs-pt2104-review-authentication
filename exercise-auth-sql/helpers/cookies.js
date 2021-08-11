const create = (res, accessToken, expiration = 300000) => {
    res.cookie('token', accessToken, { 
        expires: new Date(Date.now() + expiration),
        secure: false,
        httpOnly: true,
    })
}

const clear = res => {
    res.clearCookie('token')

}

module.exports = {
    create,
    clear,
}