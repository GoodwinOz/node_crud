import Sequelize from 'sequelize'
require('dotenv').config()

const DB_NAME = process.env.DB_NAME
const USER_NAME = process.env.USER_NAME
const PASSWORD = process.env.PASSWORD //(Hide pass to .gitignored file before push) Or don't :D

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

// module.exports = {
//     HOST: 'localhost',
//     USER: 'your_usermane',
//     PASSWORD: 'your_pass',
//     DB: 'your_db_name',
//     dialect: 'mysql',
//     pool: {
//         max: 10,
//         min: 0,
//         acquire: 15000,
//         idle: 8000 
//     }
// }


// import image from '../models/file.models'

export default sequelize