const express = require('express');
const path = require('path')

const rootDir = require('../utils/path')
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(adminData.products, 'from shop');
  // res.sendFile(path.join(rootDir, '../', 'views', 'shop.html'));
  // or
  // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
  // or
  // res.send('<h1>Hi from express one</h1>')

  // or by using pug for dynamic data
  const products = adminData.products;
  res.render(path.join('shop', { prods: products, docTitle: 'Shop', path: '/shop', pageTitle: 'Shop' }));

})


module.exports = router;