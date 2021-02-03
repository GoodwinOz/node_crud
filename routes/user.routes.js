const {Router} = require('express')
const users = require('../models/model.index')
const Users = require('../models/model.index')
const router = Router()



//User create
router.post('/', async (req, res) => {
    try {
        const user = await Users.create({
            name: req.body.name,
            mobileNumber: req.body.mobileNumber,
            dateOfBirth: req.body.dateOfBirth,
            osintInfo: req.body.osintInfo,
            avatarUrl: req.body.avatarUrl, //(?)
            active: false
        })
        res.status(201).json({user})
    } catch (e) {
        console.log(e)
        // res.status(500).json({ message: 'Server error' })
    }
})

//User findAll
router.get('/', async(req, res) => {
    try {
        const user = await Users.findAll()
        res.status(200).json(user)
    } catch(e) {
        console.log(e)
        // res.status(500).json({ message: 'Server error' })
    }
})

//user findById
router.get('/:id', async(req, res) => {
    try {
        const user = await Users.findByPk(+req.params.id)
        res.status(200).json({user})
    } catch(e) {
        console.log(e)
    }
})


//User update
router.put('/:id', async (req, res) => {
    try {
        const user = await Users.findByPk(+req.params.id)
        user.active = req.body.active
        await user.save()
        res.status(200).json({user})
    } catch (e) {
        console.log(e)
        // res.status(500).json({ message: 'Server error' })
    }
})

//Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
       const users = await Users.findAll({
           where: {
               id: +req.params.id
           }
       })
       const user = users[0]
       await user.destroy()
       res.status(204).json({})
    } catch(e) {
        console.log(e)
        // res.status(500).json({ message: 'Server error' })
    }
})



router.post('/', async(req, res) => {
    try {
        const user = await Users.findByPk(+req.user.id)
        const toChange = {
            avatarUrl: req.body.avatarUrl
        }
        if(req.file) {
            toChange.avatarUrl = req.file.path //Path to file directory (for uploading)
        }
    
        Object.assign(user, toChange)
        
        await user.save()

    } catch(e) {
        console.log(e)
    }
    
})


module.exports = router




// module.exports = app => {
//     const users = require('../controllers/users.controller.js')

//     let router = require('express').Router()

//     router.post('/', users.create)

//     router.get('/', users.findAll)

//     router.get('/registered', users.findAllRegistred)

//     router.get('/:id', users.findOne)

//     router.put('/:id', users.update)

//     router.delete('/:id', users.delete)

//     router.delete('/', users.deleteAll)

//     app.use('/api/users', router)
// }