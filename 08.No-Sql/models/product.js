// const Cart = require('../models/cart');
// const db = require('../utils/database');

// module.exports = class Product {
//     constructor(id, title, imageUrl, description, price) {
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//     }

//     save() {
//         return db.execute('INSERT INTO products (title, price, imageurl, description) VALUES (?, ?, ?, ?)',
//             [this.title, this.price, this.imageUrl, this.description]
//         )
//     }

//     static fetchAll(cb) {
//        return db.execute('SELECT * FROM products')
//     }

//     static findById(id) {
//         return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
//     }

//     static deleteById(id) {

//     }
// }


const Sequilize = require('sequelize');

const sequelize = require('../utils/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequilize.STRING,
    price: {
        type: Sequilize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequilize.STRING,
        allowNull: false
    },
    description: {
        type: Sequilize.DOUBLE,
        allowNull: false
    }
})

module.exports = Product;