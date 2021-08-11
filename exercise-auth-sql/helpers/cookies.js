const create = (res, token, expiration = 300000) => {
    res.cookie('token', token, { 
        expires: new Date(Date.now() + expiration),
        secure: false,
        httpOnly: true,
    })
}

const clear = res => {
    res.clearCookie()

}

module.exports = {
    create,
    clear,
}