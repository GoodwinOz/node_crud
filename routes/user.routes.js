// const express = require('express')
// const router = express.Router()
// const Users = require('../controllers/users.controller')

// //Post
// router.post('/', async (req, res) => {
//     try {
//         let { name, dateOfBirth, mobileNumber, osintInfo } = req.body
//         let userCreate = await Users.create({
//             name,
//             dateOfBirth,
//             mobileNumber,
//             osintInfo
//         }, {
//             fields: ['name', 'dateOfBirh', 'mobileNumber', 'osintInfo']
//         })
//         if (userCreate) {
//             res.json({
//                 message: `User id=${id}, name ${name} created`
//             })
//         }
//     } catch(e) {
//         console.log(e, 'Creating user failed')
//     }
// })

// //FindAll
// router.get('/', async (req, res) => {
//     try {
//         let users = await Users.findAll({
//             attributes: ['id', 'name', 'dateOfBirh', 'mobileNumber', 'osintInfo']
//         })
//         if (users.lenght > 0) {
//             users.forEach(async (user) => {
//                 await user.update({
//                     userid: userid ? name : user.name,
//                     name: name ? name : user.name,
//                     dateOfBirh: dateOfBirh ? dateOfBirh : user.dateOfBirh,
//                     mobileNumber: mobileNumber ? mobileNumber : user.mobileNumber,
//                     osintInfo: osintInfo ? osintInfo : user.osintInfo
//                 })
//             })
//         }
//     } catch {

//     }
// })




module.exports = app => {
    const users = require('../controllers/users.controller.js')

    let router = require('express').Router()

    router.post('/', users.create)

    router.get('/', users.findAll)

    router.get('/registered', users.findAllRegistred)

    router.get('/:id', users.findOne)

    router.put('/:id', users.update)

    router.delete('/:id', users.delete)

    router.delete('/', users.deleteAll)

    app.use('/api/users', router)
} 