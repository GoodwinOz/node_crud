const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()

let corsSettings = {
    origin: 'http://localhost:3000'
}




app.use(cors(corsSettings))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

//Here may be an error ./crud_project/models *spoiler alert* no error detected
const db = require('./models')

db.sequelize.sync({ force: true }).then(() => {
    console.log('Resync db')
})



app.get('/', (req, res) => {
    res.json({ message: 'Hey.' })
})

require('./routes/user.routes')(app)



const PORT = process.env.PORT || 3000

async function start() {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`)
        })
    } catch(e) {
        console.log(e)
    }
}

start()