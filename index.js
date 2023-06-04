// Application entry point and main function
// import statements

// Database connection
const { getConnection } = require('./lib/db')

// Main menu, which takes over the console
const { splashScreen, mainMenu } = require('./lib/main-menu')

async function main () {
  // show splash screen while database is connecting
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

// run main function
main()
