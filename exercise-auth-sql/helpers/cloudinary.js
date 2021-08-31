const cloudinary = require('../configs/cloudinary')

const genDataURI = (mimetype, buffer) => {
    const header = `data:${mimetype};base64,`
    const base64 = buffer.toString('base64')
    return `${header}${base64}`  
}
const upload = (mimetype, buffer) => async userID => {
    const dataURI = genDataURI(mimetype, buffer) 
    return await cloudinary.uploader.upload(dataURI, {folder: userID})
}

module.exports = {
    upload,
    
}