import express from 'express'
import Users from '../models/model.index'
import { isEmpty, isBoolean, toDate, isInt, isURL } from "validator"
import Post from '../models/post.model'
const router = express.Router()



//User create
router.post('/', async (req, res) => {
    // console.log(req.body, 'REQ BODY')
    // let { name, mobileNumber, dateOfBirth, password, gender, profileURL } = req.body
    // //Validation
    // if (isEmpty(name) || !isURL(profileURL) || toDate(dateOfBirth) === null) {
    //     res.json({
    //         result: 'Registration failed',
    //         data: {},
    //         message: `Fields must not be empty`
    //     })
    //     return
    // }
    try {

        // let user = await Users.create({
        //     name,
        //     mobileNumber,
        //     password,
        //     dateOfBirth,
        //     gender,
        //     profileUrl: profileURL
        // }, {
        //     fields: ['name', 'mobileNumber', 'password', 'dateOfBitrh', 'gender', 'profileUrl']
        // })

        const user = await Users.create({
            name: req.body.name,
            mobileNumber: req.body.mobileNumber,
            dateOfBirth: req.body.dateOfBirth,
            password: req.body.password,
            gender: req.body.gender,
            profileUrl: req.body.profileUrl
            // avatarUrl: req.body.avatarUrl, //(?)            
        })
        res.status(200).json(user)
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
        user.name = req.body.name
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
       res.status(204).json({message: `User with ID = ${user.id} was destroyed`})
    } catch(e) {
        console.log(e)
        // res.status(500).json({ message: 'Server error' })
    }
})

//Login user
router.post('/login', async(req, res) => {
    try {
        // const { name, password } = req.body
        let users = await Users.findAll({
            where: {
                name: req.body.name,
                password: req.body.password
            }
        })
        if (users.length > 0) {
            res.json({
                result: 'ok',
                data: users[0],
                message: 'Logged in successfully'
            })
        } else {
            res.json({
                result: 'Failed',
                data: {},
                message: `Can't fund a user`
            })
        }
    } catch(e) {
        console.log(e)
    }
})




//Find users with posts by ID
router.get('/:id', async(req, res) => {
    const { id } = req.params
    try {
        let users = await users.findAll({
            where: {
                id: id
            },
            include: {
                model: Post,
                as: 'posts',
                require: false
            }
        })
        if (users.length > 0) {
            res.json({
                result: 'Ok',
                data: users[0],
                message: "Posts listed successfully"
            })
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: 'Can\'t find posts'
            })
        }
    } catch(e) {
        console.log(e)
    }
})



Users.hasMany(Post, { foreignKey: 'userID', sourceKey: 'id' });
Post.belongsTo(Users, { foreignKey: 'userID', targetKey: 'id' });




export default router




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