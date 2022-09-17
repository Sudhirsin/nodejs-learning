const express = require('express');

const { getProducts, getIndex, getCart, getCheckout, getOrders, getProduct, postCart, postDeleteCartItem } = require('../controllers/shop')

const router = express.Router();

router.get('/', getIndex);

router.get('/products', getProducts)
router.get('products/:productId', getProduct) // /products/12323
router.get('/cart', getCart)
router.post('/cart', postCart)
router.post('/cart-delete-item', postDeleteCartItem)
router.get('/orders', getOrders)
router.get('/checkout', getCheckout)

module.exports = router;
