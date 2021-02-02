const express = require('express')
const path = require('path')
const sequelize = require('./config/db.config')
const app = express()
const PORT = process.env.PORT || 3000
const usersRoutes = require('./routes/user.routes')

// app.use(express.static(path.join(__dirname, '/')))
app.use(express.json())
app.use('/api/users', usersRoutes)



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