const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "Y@nki355",
    host: "localhost",
    port: 5432,
    database: "freeray"
});

module.exports = pool;