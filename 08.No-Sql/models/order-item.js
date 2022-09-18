const Sequlize = require('sequelize');

const sequelize = require('../utils/database');

const OrderItem = Sequlize.define('orderItem', {
    id: {
        type: Sequlize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: Sequlize.INTEGER
})

module.exports = OrderItem;