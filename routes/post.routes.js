import express from 'express'
import Posts from '../models/post.model'
const router = express.Router()

//Create post
router.post('/', async (req, res) => {
    try {
        const post = await Posts.create({
            userID: req.body.userID,
            title: req.body.title,            
            text: req.body.text
        })
        res.status(200).json(post)
    } catch (e) {
        console.log(e)
        // res.status(500).json({ message: 'Server error' })
    }
})

//Post findAll
router.get('/', async(req, res) => {
    try {
        const post = await Posts.findAll()
        res.status(200).json(post)
    } catch(e) {
        console.log(e)
        // res.status(500).json({ message: 'Server error' })
    }
})

//Post findById
// router.get('/:id', async(req, res) => {
//     try {
//         const post = await Post.findByPk(+req.params.id)
//         res.status(200).json({post})
//     } catch(e) {
//         console.log(e)
//     }
// })


//Post update
router.put('/:id', async (req, res) => {
    try {
        const post = await Posts.findByPk(+req.params.id)
        post.title = req.body.title
        await post.save()
        res.status(200).json({post})
    } catch (e) {
        console.log(e)
        // res.status(500).json({ message: 'Server error' })
    }
})

//Delete post by ID
router.delete('/:id', async (req, res) => {
    try {
       const post = await Posts.findAll({
           where: {
               id: +req.params.id
           }
       })
       const postDel = post[0] //May be an error
       await postDel.destroy()
       res.status(204).json({})
    } catch(e) {
        console.log(e)
        // res.status(500).json({ message: 'Server error' })
    }
})



export default router