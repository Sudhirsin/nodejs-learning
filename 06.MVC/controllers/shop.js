const Product = require('../models/product');

// exports.getAddProduct =  (req, res, next) => {
//     res.render('admin/add-product', {
//         pageTitle: 'Add Product',
//         path: '/admin/add-product',
//         formsCSS: true,
//         productCSS: true,
//         activeAddProduct: true
//     });
// }

// exports.postAddProduct = (req, res, next) => {
//    const product = new Product(req.body.title);
//    product.save();
//    res.redirect('/');
// }

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
          prods: products,
          pageTitle: 'Shop',
          path: '/products',
          hasProducts: products.length > 0,
          activeShop: true,
          productCSS: true
        });
    });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
          prods: products,
          pageTitle: 'All Products',
          path: '/',
        });
    }); 
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
    }) 
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders',
    }) 
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    }) 
}