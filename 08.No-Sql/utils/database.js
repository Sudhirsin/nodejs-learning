// const mysql = require('mysql2');

// There is two to connect with mysql
// 1. Make connection and close the connection on query executed. All the time we need
// make new connection and close them.

// 2. connection without sequilize
// const pool  = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: 'PushpaRaj@94'
// })


// module.exports = pool.promise();

// 3. With sequilize
const Sequilize = require('sequelize');
const sequelize = new Sequilize('node-complete', 'root', 'PushpaRaj@94', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;