const Product = require('../models/product');
// const Cart = require('../models/cart');
// const Order = require('../models/order');
// const sequelize = require('../utils/database');

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
    // with sequelize
    Product.findAll({})
        .then((products) => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'Shop',
                path: '/products',
                hasProducts: rows.length > 0,
                activeShop: true,
                productCSS: true
            });
        })
        .catch(err => console.log(err)); 
    // Product.fetchAll()
    // .then(([rows, fieldData]) => {
    //     res.render('shop/product-list', {
    //         prods: rows,
    //         pageTitle: 'Shop',
    //         path: '/products',
    //         hasProducts: rows.length > 0,
    //         activeShop: true,
    //         productCSS: true
    //       });
    // })
    // .catch(err => console.log(err));
}

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    // console.log(productId);
    // Product.findById(productId)
    //     .then(([product]) => {
    //         res.render('shop/product-detail', {
    //             product: product[0],
    //             pageTitle: product[0].title,
    //             path: '/products'
    //         })
    //     })
    //     .catch(err => console.log(err));

    // with sequelize
    // 1. we can use find method also
    // Product.findAll({ where: {id: productId }}) 
    // .then((products) => {
    //     res.render('shop/product-detail', {
    //         product: products[0],
    //         pageTitle: products[0].title,
    //         path: '/products'
    //     })
    // })
    // .catch(err => console.log(err));

    // 2. or
    Product.findById(productId)
        .then((product) => {
            res.render('shop/product-detail', {
                product: product[0],
                pageTitle: product[0].title,
                path: '/products'
            })
        })
        .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    // Product.fetchAll()
    //     then(([rows, fieldData]) => {
    //         res.render('shop/index', {
    //             prods: rows,
    //             pageTitle: 'All Products',
    //             path: '/',
    //         });
    //     })
    //     .catch(err => console.log(err)); 

    // with sequelize
    Product.findAll({})
        .then((products) => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'All Products',
                path: '/',
            });
        })
        .catch(err => console.log(err)); 
}

exports.getCart = (req, res, next) => {
    // Cart.getCart(cart => {
    //     Product.fetchAll(products => {
    //         const cartProducts = [];
    //         for(const product of products) {
    //             const cartProductData = cart.products.find(p => p.id === product.id);
    //             if (cartProductData) {
    //                 cartProducts.push({ productData: product, qty:cartProductData.qty });
    //             }
    //         }
    //         res.render('shop/cart', {
    //             pageTitle: 'Your Cart',
    //             path: '/cart',
    //             products: cartProducts
    //         }) 
    //     })
    // })

    // with sequelize
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        pageTitle: 'Your Cart',
                        path: '/cart',
                        products: products
                    }) 
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

exports.postCart = (req, res, next) => {
    // const productId = req.body.productId;
    // const product = Product.findById(productId, product => {
    //     Cart.addProduct(productId, product.price);
    // })

    // res.redirect('/');
    // res.render('shop/cart', {
    //     pageTitle: 'Your Cart',
    //     path: '/cart',
    // }) 

    // with sequelize
    const productId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: productId }})
        })
        .then(products => {
            let product;
            if(products.length > 0) {
                product = products[0]
            }

            // let newQuantity = 1
            if (product) {
                // ...
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1
                // return fetchedCart.addProduct(product, { through: { quantity: newQuantity} })
                return product;
            }
            return Product.findById(productId
                // .then(product => {
                //     return fetchedCart.addProduct(product, {through: { quantity: newQuantity } })
                // })
                // .catch(err => console.log(err))
            )
        })
        .then(product => {
            return fetchedCart.addProduct(product, { through: { quantity: newQuantity} })
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err))
}

exports.postDeleteCartItem = (req, res, next) => {
    // const productId = req.body.productId;
    // Product.findById(productId, (product) => {
    //     Cart.deleteProduct(productId, product.price);
    //     res.redirect('/cart')
    // })

    // with sequelize
    const productId = req.body.productId;
    req.user.getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: productId } })
        })
        .then(products => {
            const product = products[0];

            return product.cartItem.destroy();
        }) 
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}


exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            // console.log(products);
            return req.user.createOrder()
                .then(order => {
                    return order.addProducts(products.map(product => {
                        product.orderItem = { quantity: product.cartItem.quantity }
                        return product
                    }))
                })
                .catch(err => console.log(err))

        })
        .then(result => {
            return fetchedCart.setProducts(null) // cleanup the cart
        })
        .then(result => {
            res.redirect('/orders')
        })
        .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders({ include: ['products']})
        .then(orders => {
            res.render('shop/orders', {
                pageTitle: 'Your Orders',
                path: '/orders',
                orders: orders
            }) 
        })
        .catch(err => console.log(err))
    // res.render('shop/orders', {
    //     pageTitle: 'Your Orders',
    //     path: '/orders',
    // }) 
}

// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkout', {
//         pageTitle: 'Checkout',
//         path: '/checkout',
//     }) 
// }
