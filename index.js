// requires
const env = require('dotenv').config()
const { splashScreen, mainMenu } = require('./lib/cli-screens')
// get the MySQL client
const mysql = require('mysql2/promise')

// create the connection to database
// const connection = await mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: process.env.MYSQL_ROOT_PASSWORD,
//   database: 'test'
// })

// execute will internally call prepare and query
// connection.execute(
//   // add in prepared statements
// )

splashScreen()
mainMenu()
