const express = require('express');

const { getProduct } = require('../controllers/products')

const router = express.Router();

router.get('/', getProduct);

module.exports = router;
