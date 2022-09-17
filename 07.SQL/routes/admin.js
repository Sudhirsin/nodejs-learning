const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const { getAddProduct, postAddProduct, getProducts, getEditProduct, postEditProduct, deleteProduct }  = require('../controllers/admin')

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product', getAddProduct);

router.get('/products', getProducts);

// /admin/add-product => POST
router.post('/add-product', postAddProduct);

router.get('/edit-product/:productId', getEditProduct);

router.post('/edit-product', postEditProduct);

router.post('/delete-product', deleteProduct)

module.exports = router;