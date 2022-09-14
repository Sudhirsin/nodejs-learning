const express = require('express');
const bodyParser = require('body-parser');

const path = require('path')


const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pageNotFoundRoute = require('./routes/404');

const app = express();

const PORT = 5000

app.use(bodyParser.urlencoded({ extended: false })) // it will use to parse the body

 
// use will allowed add middleware
// it will executed on every request
app.use((req, res, next) => { // First middleware
    console.log('This is middleware')
    next() // will allow to go to next middleware other wise after that middleware didn't work
})

// 2nd middleware
// app.use((req, res, next) => {
//     console.log('This is another middleware')
//     res.send('<h1>Hello from express</h1>')
// })


// app.use('/add-product', (req, res, next) => {
//     console.log('This is middleware add products')
//     res.send(` <form action="/message" method="POST">
//             <input type="text" name="message" />
//             <button type="submit">Send</button>
//         </form>`
//     )
// })

// app.use('/', (req, res, next) => {
//     console.log('This is middleware add products')
//     res.send('<h1>Hi from express one</h1>')
// })

// app.post('/add-product', (req, res, next) => {
//     console.log('This is middleware add products')
//     res.send(` <form action="/message" method="POST">
//             <input type="text" name="message" />
//             <button type="submit">Send</button>
//         </form>`
//     )
// })

// or

app.use('/admin', adminData.routes); // using admin router


// app.get('/', (req, res, next) => {
//     res.send('<h1>Hi from express one</h1>')
// })

// or

app.use(shopRoutes);
// app.use(pageNotFoundRoute);
// or
app.use((req, res, next) => {
    // serving html form views
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
    // or 
    // res.status(404).send(`<h1>Page not found</h1>`)
})

// app.get('/product', (req, res, next) => {
//     const body = req.body;
//     console.log(body);
//     res.send('<h1>product page</h1>')
//     res.redirect('/')
// })




app.listen(5000, () => {
    console.log(`Server started listening on http://localhost:${PORT}`)
})

 



