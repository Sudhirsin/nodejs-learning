const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const { get404 } = require('./controllers/error')
// const db = require('./utils/database')
const sequelize = require('./utils/database')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

// DB connection here
// db.execute('SELECT * FROM products')
//     .then((res) => {
//         console.log(res, 'From db')
//     })
//     .catch(err => {
//         console.log(err, 'From db error')
//     });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Adding middleware for user.
app.use((req, res, next) => {
    User.findById(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})

app.get('/', (req, res) => {
    res.send('Server running')
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

// TABLE RELATIONS
Product.belongsTo(User), { constraints: true, onDelete: 'CASCADE' }; // relation
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through : CartItem });
Product.belongsToMany(Cart, { through : CartItem });

Order.belongsTo(User);
User.hasMany(Order); // one user can have many orders;
Order.belongsToMany(Product, { through: OrderItem })


// sync with db and create tables
// sync({ force: true }) => to override the table changes
sequelize
    .sync()
    // sync({ force: true })
    .then(res => {
        return User.findById(1);
        // console.log(res)
        // we will start the our server
        // app.listen(3000);
    }) 
    .then(user => {
        if (!user) {
            return User.create({ name: 'Max', email: 'test@gmail.com' })
        }
        return Promise.resolve(user)
    })
    .then(user => {
        return user.createCart();
    })
    .then(cart => {
        // console.log(user, 'user')
        app.listen(3000);
    })
    .catch(err => console.log(err))

