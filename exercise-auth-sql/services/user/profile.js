module.exports = db => async (req, res, next) => {

    console.info('>> COOKIKE:', res.cookies)
    res.status(200).json({
        success: true,

    })
}