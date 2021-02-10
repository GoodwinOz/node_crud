import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
require('dotenv').config()
import Users from '../models/model.index'
import { isEmpty, isBoolean, toDate, isInt, isURL } from "validator"
import Post from '../models/post.model'
const router = express.Router()



//User create
router.post('/register', async (req, res) => {
    const {login, nameAndSurname, password, mobileNumber, gender, email, status, /*avatarUrl*/ } = req.body

    try {
        const hashedPass = await bcrypt.hash(password, 10)
        const user = await Users.create({
            login, //: req.body.login,
            nameAndSurname, //: req.body.nameAndSurname,
            password: hashedPass,
            mobileNumber, //: req.body.mobileNumber,
            gender, //: req.body.gender,
            email,  //: req.body.email
            status//, // admin/user/content creator etc. for future validation
            //avatarUrl
        })
        // const userSignup = await user.save()

        // const payload = {
        //     user: {
        //         id: userSignup.id
        //     }
        // }
        // jwt.sign(payload, process.env.SECRET, {expiresIn: 86400}, function(err, token) {
        //     if (err){
        //         res.send(err)
        //     }
        //     res.header('auth-token', token)
        //     res.status(200).json({token, userSignup})
        // })
        // tokenGen = function(err, user) {
        //     if (err) return res.status(500).send(
        //         'There was a problem with user.reg.'
        //     )
        //     //create token
        //     let token = jwt.sign({ id: user.id }, process.env.SECRET, {
        //         expiresIn: 86400 //24 hrs.
        //     })
        //     res.status(200).send({ auth: true, token: token })
        // }

        res.status(200).json(user)
    } catch (e) {
        console.log(e)
        // res.status(500).json({ message: 'Server error' })
    }
    
})


//Login user
router.post('/login', async(req, res) => {   
    
    const users = await Users.findOne({
        where: {
        login: req.body.login
            // password: req.body.password
            // status
        }
    })
    // console.log(users)

    try {
        const decryptedPass = await bcrypt.compare(req.body.password/*.toString()*/, users.password/*.toString()*/)

        const token = await jwt.sign(JSON.stringify(users), process.env.SECRET, /*{
            expiresIn: 86400
        }*/)
        if(decryptedPass) {
            res.header('auth-token', token).json({
                error: null,
                data: {
                    token
                }
            })
        } else {
            res.json({ message: 'Invalid user data' })
        }
        
        
        // if (users) {
        //     const accessToken = jwt.sign({ login: users.login, status: users.status }, process.env.SECRET)

        //     res.json({ accessToken })
        // } else {
        //     res.send('Username or password are incorrect')
        // }




        // if (users.length > 0) {
        //     res.json({
        //         result: 'ok',
        //         data: users[0],
        //         message: 'Logged in successfully'
        //     })
        // } else {
        //     res.json({
        //         result: 'Failed',
        //         data: {},
        //         message: `Can't fund a user`
        //     })
        // }
        
        // res.header('auth-token', token).send(token)
    } catch(e) {
        console.log(e)
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
        user.login = req.body.login
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




export default router