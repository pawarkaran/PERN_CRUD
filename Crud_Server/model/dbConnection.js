const Pool = require("pg").Pool;

const pool = new Pool({
    host:  process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,   
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

pool.connect(err => {
    if (err) {
      console.error('DB Connection error: ', err.message);
    } else {
      console.log('DB Connected');
    }
  });

module.exports = pool;