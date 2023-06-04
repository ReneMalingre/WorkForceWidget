// import statements
const mysql = require('mysql2/promise')
const { getConnection } = require('./lib/db')

const { splashScreen, mainMenu } = require('./lib/main-menu')

async function main () {
  // show splash screen
  splashScreen()

  // connect to the database
  let db = null
  try {
    db = await getConnection()
  } catch (err) {
    console.log('Error connecting to the database.')
    console.log(err)
    return
  }

  // show main menu and run main application functions
  await mainMenu()
}

main()
