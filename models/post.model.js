import Sequelize from 'sequelize'
import sequelize from'../config/db.config'
// const Op = require('../config/db.config').Op

const Posts = sequelize.define('posts', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,        
        allowNull: false
    },
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },      
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    }      
})

export default Posts