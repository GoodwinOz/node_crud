const db = require('../models')
const User = db.users
const Op = db.Sequelize.Op

//Create & save User
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: 'Field can\'t be empty'
        })
        return
    }

    //Create User
    const user = {
        name: req.body.name,
        date_of_birth: req.body.date_of_birth,
        mobile_number: req.body.mobile_number,
        osint_info: req.body.osint_info,
        registered: req.body.registered ? req.body.registered : false
    }

    User.create(user)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured in process of User creation'
            })
        })
}

exports.findAll = (req, res) => {
    const name = req.query.name;
    let condition = name ? { name: { [Op.like]:`%${name}%` } }: null

    User.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.messsage || 'Some error occured in process of retrieving'
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    User.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving User with id' + id
            })
        })
}

//Update by ID in req
exports.update = (req, res) => {
    const id = req.params.id

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: `User with id=${id} was updated.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                mesage: 'Error updating User info with id=' +id
            })
        })
}

//Delete user
exports.delete = (req, res) => {
    const id = req.params.id

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: `User ${id} was deleted`
                })
            } else {
                res.send({
                    message: `Can't delete User with id=${id}. Maybe User was not found.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Couldn\'t delete User with id=' + id
            })
        })    
}

//DB data annihilation
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Users was deleted.`})
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured while annihilation process'
            })
        })
}

//Find all registered
exports.findAllRegistred = (req, res) => {
    User.findAll({ where: { registered: true }})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured while retrieving Users'
            })
        })
}
