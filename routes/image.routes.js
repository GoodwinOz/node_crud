// const express = require('express')
// const Upload = require('../models/file.models')
// const router = express.Router()
// //Upload route
// router.post('/api/upload', async(req, res, next) => {
//     try {
//         const upload = await Upload.create()
//         return res.status(201).json({
//             message: 'File uploaded successfully'
//         })
//         return upload
//     } catch (e) {
//         console.log(e)
//     }
// })
// // router.post('/api/upload', upload.single('image'), (req, res, next) => {
// //     try {
// //         return res.status(201).json({
// //             message: 'File uploaded successfully'
// //         })
// //     } catch (e) {
// //         console.log(e)
// //     }
// // })

// module.exports = router


// router.post('/api/upload', async(req, res) => {
//     try {
//         const user = await Users.findByPk(+req.user.id)
//         const toChange = {
//             avatarUrl: req.body.avatarUrl
//         }
//         if(req.file) {
//             toChange.avatarUrl = req.file.path //Path to file directory (for uploading)
//         }
        
//         await user.save()

//     } catch(e) {
//         console.log(e)
//     }
    
// })

