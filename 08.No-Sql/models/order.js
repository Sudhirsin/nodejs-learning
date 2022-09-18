const Sequlize = require('sequelize');

const sequelize = require('../utils/database');

const Order = Sequlize.define('order', {
    id: {
        type: Sequlize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    // we can add address
})

module.exports = Order;