const { Pool } = require('pg');

const PG_URI = 'postgres://akxmiyij:3iv3FkB-npO3nwTVijY_ABCC0T3SqzMs@drona.db.elephantsql.com:5432/akxmiyij';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};