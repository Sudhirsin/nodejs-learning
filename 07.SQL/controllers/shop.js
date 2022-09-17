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

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    // console.log(productId);
    Product.findById(productId, (product) => {
        // console.log(product);
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        })
    })
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
