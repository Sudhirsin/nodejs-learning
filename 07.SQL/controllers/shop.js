const Product = require('../models/product');
const Cart = require('../models/cart');

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
    Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/product-list', {
            prods: rows,
            pageTitle: 'Shop',
            path: '/products',
            hasProducts: rows.length > 0,
            activeShop: true,
            productCSS: true
          });
    })
    .catch(err => console.log(err));
}

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    // console.log(productId);
    Product.findById(productId)
        .then(([product]) => {
            res.render('shop/product-detail', {
                product: product[0],
                pageTitle: product[0].title,
                path: '/products'
            })
        })
        .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        then(([rows, fieldData]) => {
            res.render('shop/index', {
                prods: rows,
                pageTitle: 'All Products',
                path: '/',
            });
        })
        .catch(err => console.log(err)); 
}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(const product of products) {
                const cartProductData = cart.products.find(p => p.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty:cartProductData.qty });
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products: cartProducts
            }) 
        })
    })
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    const product = Product.findById(productId, product => {
        Cart.addProduct(productId, product.price);
    })

    res.redirect('/');
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
    }) 
}

exports.postDeleteCartItem = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        Cart.deleteProduct(productId, product.price);
        res.redirect('/cart')
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
