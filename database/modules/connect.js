const pg = require('pg');

var pgdb = new pg.Pool({
    host:'192.168.58.144',
    port:5432,
    password:'123',
    database:'postgres',
    user:'postgres'
})

module.exports = pgdb;