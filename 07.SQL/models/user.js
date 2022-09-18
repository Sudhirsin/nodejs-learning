const Sequilize = require('sequelize');

const sequelize = require('../utils/database');

const User = sequelize.define('user', {
    id : {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequilize.STRING,
    email: Sequilize.STRING,
    password: Sequilize.STRING
})


module.exports = User;