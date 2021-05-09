var mysql = require('mysql');
const env = require('./environment');
var connection = mysql.createConnection({
    host: env.host,
    user: env.username,
    password: env.password,
    database: env.database
});
connection.connect(function(error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Connexion établie avec la base de donnée !');
    }
});
module.exports = connection;