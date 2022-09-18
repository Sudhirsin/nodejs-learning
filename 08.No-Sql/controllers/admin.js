const Product = require('../models/product');

exports.getAddProduct =  (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;

    // with sequelize
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        user: req.user.id // set up user with middleware in app.js
    })

    // const product = new Product(null, title, imageUrl, description, price);
    // product
    //     .save()
    //     .then(res => {
    //         res.redirect('/');
    //     })
    //     .catch(err => console.log(err));

    // with sequelize
    // Product.create({
    //     title: title,
    //     price: price,
    //     imageUrl: imageUrl,
    //     description: description,
    //     user: req.user.id // set up user with middleware in app.js
    // })
    .then(product => {
        console.log('Deleted successfully')
        res.redirect('/admin/products')
    }).catch(err => console.log(err))
}

exports.getEditProduct =  (req, res, next) => {
    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/')
    }

    const productId = req.params.productId;
    // Product.findById(productId, (product) => {
    //     if (!product) {
    //         return res.redirect('/');
    //     }
    //     res.render('admin/edit-product', {
    //         pageTitle: 'Edit Product',
    //         path: '/admin/edit-product',
    //         editing: editMode,
    //         product: product
    //     });
    // })

    // with sequelize
    req.user.getProducts({where: { id: prodId }})
    // Product.findById(productId)
        .then((products) => {
            const product = products[0];
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        })
        .catch(err => console.log(err))
    
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updateTitle = req.body.title
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;

    // const updatedProduct = new Product(prodIdl, updateTitle, updatedImageUrl, updatedDescription, updatedPrice);

    // updatedProduct.save();

    // with sequelize
    Product.findById(prodId)
    .then(product => {
        product.title = updateTitle;
        product.price = updatedPrice;
        product.description = updatedDescription;
        product.imageUrl = updatedImageUrl

        return product.save();
    })
    .then(result => {
        console.log('Updated Product')
        res.redirect('/admin/products')
    })
    .catch(err=> console.log(err))
}

exports.getProducts = (req, res, next) => {
    // with sequlize
    Product.findAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
              }); 
        })
        .catch(err => console.log(err));
    
    // Product.fetchAll((products) => {
    //     res.render('admin/products', {
    //       prods: products,
    //       pageTitle: 'Admin Products',
    //       path: '/admin/products'
    //     });
    // });
 }


exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    // Product.deleteById(prodId);

    // with sequelize
    // 01
    // Product.destroy({})
    // 02
    Product.findById(prodId)
    .then(product => {
        return product.destroy();
    })
    .then(product => {
        console.log('Deleted successfully')
        res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}
