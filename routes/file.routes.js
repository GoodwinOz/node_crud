import express from 'express'
import Upload from '../models/file.models'
import uploadFile from '../middleware/file'
const router = express.Router()

router.post('/', uploadFile.single('file'), async (req, res) => {
    try {
        const upload = await Upload.create({
            type: req.body.type,
            name: req.file.originalname,
            url: req.file.path
        })
        
        res.status(200).json(upload)
    } catch (e) {
        console.log(e)
        // res.status(500).json({ message: 'Server error' })
    }
})



export default router


// app.use('/api/upload', uploadFile.single('file'), (req, res) => {
//     console.log(req.file)
//     return res.send('Single file uploaded')
// })