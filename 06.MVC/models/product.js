const fs = require('fs');
const path = require('path');

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
    constructor(title, imageUrl, description, price) {
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
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log('Erroe while saving file')
            })
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
}