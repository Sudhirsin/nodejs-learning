const express = require('express');
const path = require('path');

const rootDir = require('../utils/path')

const router = express.Router();

const products = [];


// get will do the exact match but `use` not
// admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  // adding absolute path here
  // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
  // or
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  // or with pug
  res.render('add-product', { pageTitle: 'Add product', path: '/admin/add-product',  pageTitle: 'Add Product' })
  // or
  // res.send(` <form action="/admin/add-product" method="POST">
  //         <input type="text" name="title" />
  //         <button type="submit">Send</button>
  //     </form>`
  // )
})

// admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  const body = req.body;

  products.push({ title: req.body.title })

  console.log(body);
  res.redirect('/')
})

exports.routes = router;
exports.products = products