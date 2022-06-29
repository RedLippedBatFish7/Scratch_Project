const { Pool } = require('pg');
const { Client } = require('pg');
require('dotenv').config(); // use this where we need DB

const PG_URI = process.env.PG_URI; // config generates process.env

// create a new pool here using the connection string above
// const client = new Client({
//   connectionString: PG_URI,
// });
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    // console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
