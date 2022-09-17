const mysql = require('mysql2');

// There is two to connect with mysql
// 1. Make connection and close the connection on query executed. All the time we need
// make new connection and close them.

// 2. c
const pool  = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'PushpaRaj@94'
})


module.exports = pool.promise();