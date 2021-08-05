var mysql = require('mysql');
const db = mysql.createPool({
    host : '18.188.140.138',
    port : 3306,
    user : 'user01',
    password : 'dkapflzksh0405',
    database : 'movies_db'
});

module.exports = db;