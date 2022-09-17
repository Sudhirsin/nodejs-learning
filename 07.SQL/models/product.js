const fs = require('fs');
const path = require('path');

const Cart = require('../models/cart');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')


const getProductFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([])
        }
        cb(JSON.parse(fileContent));
    })
}

// const products = []

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        // products.push(this)
        // or
        // const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')
        // fs.readFile(p, (err, fileContent) => {
        //     let products = [];
        //     if (!err) {
        //         products = JSON.parse(fileContent);

        //     }

        //     products.push(this);
        //     fs.writeFile(p, JSON.stringify(products), (err) => {
        //         console.log('Erroe while saving file')
        //     })
        // });
        // or
        getProductFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(p => p.id === this.id)
                const updatedProducts = [ ...products ];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log('Erroe while saving file')
                })
            } else {
                this.id = Math.random().toString()
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log('Erroe while saving file')
                })
            }
        });
    }

    static fetchAll(cb) {
        // const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')
        // fs.readFile(p, (err, fileContent) => {
        //     if (err) {
        //         cb([])
        //     }
        //     cb(JSON.parse(fileContent));
        // })

        getProductFromFile(cb);
    }

    static findById(id, cb) {
        getProductFromFile(products => {
            const product = products.find((p) => p.id === id);
            cb(product);
        })
    }

    static deleteById(id) {
        getProductFromFile(products => {
            const product = products.find(p => p.id === id);
            const updatedProducts = products.filter((p) => p.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if (!err) {
                    Cart.deleteProduct(id, product.price)
                }
            })
            cb(product);
        })
    }
}