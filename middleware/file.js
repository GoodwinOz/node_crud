const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'images') //null || error
    },
    filename(req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) { //Image format validation
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({
    storage, //storage: storage
    fileFilter //fileFilter: fileFilter
})