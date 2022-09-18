const Sequlize = require('sequelize');

const sequelize = require('../utils/database');

const CartItem = Sequlize.define('cartItem', {
    id: {
        type: Sequlize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: Sequlize.INTEGER
})

module.exports = CartItem;