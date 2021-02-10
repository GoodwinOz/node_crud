import Sequelize from 'sequelize'
import sequelize from'../config/db.config'

const Upload = sequelize.define('upload', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,        
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'image'
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
        // defaultValue: ''
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
        // defaultValue: ''
    }
})

export default Upload