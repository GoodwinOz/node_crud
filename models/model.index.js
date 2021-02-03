// const { Sequelize } = require('sequelize')
const Sequelize = require('sequelize')
const sequelize = require('../config/db.config')

const users = sequelize.define('Users', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
    },
    dateOfBirth: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
    },
    mobileNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
    },
    osintInfo: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    avatarUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
    }
})

module.exports = users


// const dbConfig = require('../config/db.config')

// const Sequelize = require('sequelize')
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,
//     operatorsAliases: false,

//     pool: {
//         max: dbConfig.pool.max,
//         min: dbConfig.pool.min,
//         acquire: dbConfig.pool.acquire,
//         idle: dbConfig.pool.idle
//     }
// })

// const db = {}

// db.Sequelize = Sequelize
// db.sequelize = sequelize

// db.users = require('./users.model.js')(sequelize,Sequelize)

// module.exports = db