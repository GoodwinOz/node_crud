import express from 'express'
import passport from 'passport'
import session from 'express-session'
import path from 'path'
import sequelize from './config/db.config'
const app = express()
const PORT = process.env.PORT || 3000
import usersRoutes from './routes/user.routes'
import postRoutes from './routes/post.routes'
import uploadRoutes from './routes/file.routes'
import uploadFile from './middleware/file'
import verifyToken from './middleware/validate.token'
require('dotenv').config()


app.use(express.static(path.join(__dirname, '/')))
app.use(express.static(path.join(__dirname, '/uploads')))
// app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false
}))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use('/api/users', usersRoutes)
app.use('/api/posts', verifyToken, postRoutes)
app.use('/api/upload', uploadRoutes)


// app.use('/api/upload', uploadFile.single('file'), (req, res) => {
//     console.log(req.file)
//     return res.send('Single file uploaded')
// })
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
