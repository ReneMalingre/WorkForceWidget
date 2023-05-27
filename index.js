// get the MySQL client
const mysql = require('mysql2/promise')

// create the connection to database
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
})

// execute will internally call prepare and query
connection.execute(
  // add in prepared statements
)
