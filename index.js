import express from 'express'
import path from 'path'
import sequelize from './config/db.config'
const app = express()
const PORT = process.env.PORT || 3000
import usersRoutes from './routes/user.routes'
import postRoutes from './routes/post.routes'
import uploadFile from './middleware/file'


app.use(express.static(path.join(__dirname, '/')))
// app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api/users', usersRoutes)
app.use('/api/posts', postRoutes)


app.use('/api/upload', uploadFile.single('file'), (req, res) => {
    console.log(req.file)
    return res.send('Single file uploaded')
})
// app.use(uploadImage()) //(?) 'avatar' - fieldname where Obj(img) will be handled



app.get('/', (req, res, next) => {
    res.json({ message: 'Main' })
})




async function start() {
    try {
        await sequelize.sync()
        app.listen(PORT)
    } catch(e) {
        console.log(e)
    }
}

start()


// const express = require('express')
// const cors = require('cors')
// const bodyParser = require('body-parser')


// const app = express()

// let corsSettings = {
//     origin: 'http://localhost:3000'
// }




// app.use(cors(corsSettings))

// app.use(bodyParser.json())

// app.use(bodyParser.urlencoded({ extended: true }))

// //here may be an error ./crud_project/models
// const db = require('./models')

// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Resync db')
// })



// app.get('/', (req, res) => {
//     res.json({ message: 'Hey.' })
// })

// require('./routes/user.routes')(app)

// const PORT = process.env.PORT || 3000
// app.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`)
// })