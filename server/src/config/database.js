const Pool = require('pg').Pool;
pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'postgres'
});

module.exports = { pool };
