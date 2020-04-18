const Pool = require('pg').Pool;

const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT, CONNECTION_STRING } = process.env;

let pool;
if (CONNECTION_STRING) {
  pool = new Pool({ connectionString: CONNECTION_STRING, });
} else {
  pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: DB_PORT,
  });
}

module.exports = pool;
