const Sequelize = require('sequelize')

const DB_NAME = 'users'
const USER_NAME = 'main'
const PASSWORD = 'qwerty123' //(Hide pass to .gitignored file before push) Or don't :D

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
    host: 'localhost',
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

module.exports = sequelize