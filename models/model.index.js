// const { Sequelize } = require('sequelize')
import Sequelize from 'sequelize'
import sequelize from '../config/db.config'
import Post from './post.model'

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
        // defaultValue: ""
    },
    dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false,
        // defaultValue: ""
    },
    mobileNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        // defaultValue: ""
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        // defaultValue: ""
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false,
        // defaultValue: ""
    },
    profileUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        // defaultValue: ""
    }
    // avatarUrl: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     defaultValue: ""
    // }
})

users.hasMany(Post, { foreignKey: 'userID', sourceKey: 'id' });
Post.belongsTo(users, { foreignKey: 'userID', targetKey: 'id' });

export default users


// module.exports = users


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