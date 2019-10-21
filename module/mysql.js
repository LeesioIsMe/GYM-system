
var mysql = require("mysql");

var pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "171007liwu",
    database: "gym-system"
})

module.exports = {
    pool
}