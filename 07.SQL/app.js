const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const { get404 } = require('./controllers/error')
const db = require('./utils/database')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

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

app.get('/', (req, res) => {
    res.send('Server running')
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

app.listen(3000);
