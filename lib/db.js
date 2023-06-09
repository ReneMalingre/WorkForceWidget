// Used to create and close a connection to the database
// This module is used by other modules to get a connection to the database
// without having to create a new connection every time
// Uses dotenv to get environment variables from .env file
const env = require('dotenv').config()
const mysql = require('mysql2/promise')

// store connection object in a global variable
let connection = null

async function getConnection () {
  if (!connection) {
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      })
    } catch (err) {
      console.log('Error connecting to the database.')
      console.log(err)
      throw err
    }
  }
  return connection
}

function closeConnection () {
  if (connection) {
    connection.end()
    connection = null
  }
}

module.exports = {
  getConnection,
  closeConnection
}
