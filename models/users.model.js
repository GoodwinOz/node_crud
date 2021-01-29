// const { Sequelize } = require("sequelize/types");
// // const { Sequelize } = require("sequelize")
// const { sequelize } = require(".");
// // import { Sequelize } from 'sequelize'

module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define('users', {
        name: {
            type: Sequelize.STRING
        },
        date_of_birth: {
            type: Sequelize.STRING
        },
        mobile_number: {
            type: Sequelize.STRING
        },
        osint_info: {
            type: Sequelize.STRING
        }
    })
    return Users
}