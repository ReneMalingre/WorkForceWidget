// some utilities to colorise the output
const { outputGreenBoldText, outputYellowText, outputRedText } = require('./utils')

// database connection
const { closeConnection } = require('./db')

// inquirer for prompting the user
const inquirer = require('inquirer')

// chalk for colors in the console
const chalk = require('chalk')

// import the queries
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  getAllDepartmentNames,
  getAllManagerNames,
  getAllRoleNames,
  getAllEmployeeNames,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  deleteEmployee,
  addDepartment,
  deleteDepartment,
  addRole,
  deleteRole,
  viewTotalUtilisedBudgetByDepartment,
  viewEmployeesByManager,
  viewEmployeesByDepartment
} = require('./queries')
const e = require('express')

// display splash screen logo
function splashScreen () {
  const arr = [
    '__        __         _        _____',
    '\\ \\      / /__  _ __| | __   |  ___|__  _ __ ___ ___',
    " \\ \\ /\\ / / _ \\| '__| |/ /   | |_ / _ \\| '__/ __/ _ \\",
    '  \\ V  V / (_) | |  |  <     |  _| (_) | | | (_|  __/',
    '   \\_/\\_/ \\___/|_|  |_|\\_\\   |_|  \\___/|_|  \\___\\___|',
    '',
    '     __        ___     _            _',
    '     \\ \\      / (_) __| | __ _  ___| |_',
    '      \\ \\ /\\ / /| |/ _` |/ _` |/ _ \\ __|',
    '       \\ V  V / | | (_| | (_| |  __/ |_',
    '        \\_/\\_/  |_|\\__,_|\\__, |\\___|\\__|',
    '                         |___/'
  ]

  console.clear()
  // show the splash screen logo
  for (let i = 0; i < arr.length; i++) {
    outputGreenBoldText(arr[i])
  }
}

// display main menu to run the app
function mainMenu () {
  console.log('')
  inquirer.prompt([
    {
      type: 'list',
      name: 'main',
      message: chalk.bold.green('Main menu:'),
      choices: [
        'View Tables and Information',
        'Department Management',
        'Role Management',
        'Employee Management',
        'Clear Screen',
        'Exit Work Force Widget'
      ]
    }
  ])
    .then(answer => {
      switch (answer.main) {
        case 'View Tables and Information':
          return viewInformationMenu().then(() => mainMenu())
        case 'Department Management':
          return departmentMenu().then(() => mainMenu())
        case 'Role Management':
          return roleMenu().then(() => mainMenu())
        case 'Employee Management':
          return employeeMenu().then(() => mainMenu())
        case 'Clear Screen':
          splashScreen()
          mainMenu()
          break
        case 'Exit Work Force Widget':
          // close the database connection
          closeConnection()
          // say goodbye
          outputYellowText('\nThanks for using Work Force Widget. Goodbye!\n')
          // exit the app
          process.exit(0)
      }
    })
}

function viewInformationMenu () {
  console.log('')
  return inquirer.prompt([
    {
      type: 'list',
      name: 'view',
      message: chalk.bold.blueBright('View Information:'),
      choices: [
        'View all Departments',
        'View all Roles',
        'View all Employees',
        'View Employees by Manager',
        'View Employees by Department',
        'View Total Utilised Budget by Department',
        'Clear Screen',
        'Back to Main Menu'
      ]
    }
  ])
    .then(async answer => {
      switch (answer.view) {
        case 'View all Departments':
          return viewAllDepartments().then(() => viewInformationMenu())
        case 'View all Roles':
          return viewAllRoles().then(() => viewInformationMenu())
        case 'View all Employees':
          return viewAllEmployees().then(() => viewInformationMenu())
        case 'View Employees by Manager':
          return managerEmployeesMenu().then(() => viewInformationMenu())
        case 'View Employees by Department':
          return departmentEmployeesMenu().then(() => viewInformationMenu())
        case 'View Total Utilised Budget by Department':
          return departmentBudgetMenu().then(() => viewInformationMenu())
        case 'Clear Screen':
          console.clear()
          await viewInformationMenu()
          break
        case 'Back to Main Menu':
          // return to main menu by doing nothing
      }
    })
}

function employeeMenu () {
  console.log('')
  return inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: chalk.bold.blueBright('Employee Management:'),
      choices: [
        'View All Employees',
        'View Employees by Manager',
        'View Employees by Department',
        'Add Employee',
        'Update Employee Role',
        'Update Employee Manager',
        'Delete Employee',
        'Clear Screen',
        'Back to Main Menu'
      ]
    }
  ])
    .then(async answer => {
      switch (answer.employee) {
        case 'View All Employees':
          return viewAllEmployees().then(() => employeeMenu())
        case 'View Employees by Manager':
          return managerEmployeesMenu().then(() => employeeMenu())
        case 'View Employees by Department':
          return departmentEmployeesMenu().then(() => employeeMenu())
        case 'Add Employee':
          return addEmployeePrompts().then(() => employeeMenu())
        case 'Update Employee Role':
          return updateEmployeeRolePrompts().then(() => employeeMenu())
        case 'Update Employee Manager':
          return updateEmployeeManagerPrompts().then(() => employeeMenu())
        case 'Delete Employee':
          return deleteEmployeePrompts().then(() => employeeMenu())

        case 'Clear Screen':
          console.clear()
          await employeeMenu()
          break
        case 'Back to Main Menu':
      }
    })
}

function roleMenu () {
  console.log('')
  return inquirer.prompt([
    {
      type: 'list',
      name: 'role',
      message: chalk.bold.blueBright('Role Management:'),
      choices: [
        'View All Roles',
        'Add Role',
        'Delete Role',
        'Clear Screen',
        'Back to Main Menu'
      ]
    }
  ])
    .then(async answer => {
      switch (answer.role) {
        case 'View All Roles':
          return viewAllRoles().then(() => roleMenu())
        case 'Add Role':
          return addRolePrompts().then(() => roleMenu())
        case 'Delete Role':
          return deleteRolePrompts().then(() => roleMenu())
        case 'Clear Screen':
          console.clear()
          await roleMenu()
          break
        case 'Back to Main Menu':
      }
    })
}

function departmentMenu () {
  console.log('')
  return inquirer.prompt([
    {
      type: 'list',
      name: 'department',
      message: chalk.bold.magentaBright('Department Management:'),
      choices: [
        'View All Departments',
        'Add Department',
        'Delete Department',
        'View Total Utilised Budget by Department',
        'Clear Screen',
        'Back to Main Menu'
      ]
    }
  ])
    .then(async answer => {
      switch (answer.department) {
        case 'View All Departments':
          return viewAllDepartments().then(() => departmentMenu())
        case 'Add Department':
          return addDepartmentPrompts().then(() => departmentMenu())
        case 'Delete Department':
          return deleteDepartmentPrompts().then(() => departmentMenu())
        case 'View Total Utilised Budget by Department':
          return departmentBudgetMenu().then(() => departmentMenu())
        case 'Clear Screen':
          console.clear()
          await departmentMenu()
          break
        case 'Back to Main Menu':
      }
    })
}

// Choose a department to view total utilised budget
async function departmentBudgetMenu () {
  console.log('')
  const allDepartmentNames = await getAllDepartmentNames()
  const departments = ['Show all Departments', ...allDepartmentNames, 'Back to Main Menu']

  return inquirer.prompt([
    {
      type: 'list',
      name: 'departmentBudget',
      message: chalk.bold.blueBright('Department Budget:'),
      choices: departments
    }
  ])
    .then(async answer => {
      switch (answer.departmentBudget) {
        case 'Show all Departments':
          return await viewTotalUtilisedBudgetByDepartment()
        case 'Back to Main Menu':
          return
        default:
          return await viewTotalUtilisedBudgetByDepartment(answer.departmentBudget)
      }
    })
}

// Choose a manager to view employees of that manager
async function managerEmployeesMenu () {
  console.log('')
  const allManagerNames = await getAllManagerNames()
  const managers = ['Show all Managers', ...allManagerNames, 'Back to Main Menu']
  return inquirer.prompt([
    {
      type: 'list',
      name: 'manager',
      message: chalk.bold.blueBright('Manager:'),
      choices: managers
    }
  ])
    .then(async answer => {
      // extract the id off the end of the manager name
      let managerAnswer = answer.manager
      let managerName = ''
      const match = managerAnswer.match(/(.*) \(id:(\d+)\)/)
      if (match) {
        // name
        managerName = match[1].trim()
        // id
        managerAnswer = match[2]
      }
      switch (managerAnswer) {
        case 'Show all Managers':
          return await viewEmployeesByManager()
        case 'Back to Main Menu':
          return
        default:
          return await viewEmployeesByManager(parseInt(managerAnswer), managerName)
      }
    })
}

// Choose a department to view employees of that department
async function departmentEmployeesMenu () {
  console.log('')
  const allDepartmentNames = await getAllDepartmentNames()
  const departments = ['Show all Departments', ...allDepartmentNames, 'Back to Main Menu']
  return inquirer.prompt([
    {
      type: 'list',
      name: 'department',
      message: chalk.bold.blueBright('Department:'),
      choices: departments
    }
  ])
    .then(async answer => {
      switch (answer.department) {
        case 'Show all Departments':
          return await viewEmployeesByDepartment()
        case 'Back to Main Menu':
          return
        default:
          return await viewEmployeesByDepartment(answer.department)
      }
    })
}

// Add a new Employee based on user input
async function addEmployeePrompts () {
  // get all roles and managers to populate the choices
  // they have (id:xx) at the end of the name so we can extract the id
  const roles = await getAllRoleNames()
  roles.push('No Job Role Set')
  const managers = await getAllManagerNames()
  managers.push('No Manager Set')

  return inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: chalk.bold.blueBright('First Name:'),
      validate: input => {
        if (input) {
          return true
        } else {
          console.log(chalk.redBright('Please enter a first name'))
          return false
        }
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: chalk.bold.blueBright('Last Name:'),
      validate: input => {
        if (input) {
          return true
        } else {
          console.log(chalk.redBright('Please enter a last name'))
          return false
        }
      }
    },
    {
      type: 'list',
      name: 'role',
      message: chalk.bold.blueBright('Role:'),
      choices: roles
    },
    {
      type: 'list',
      name: 'manager',
      message: chalk.bold.blueBright('Manager:'),
      choices: managers
    }
  ])
    .then(async answer => {
      // extract the id off the end of the role name
      const roleAnswer = answer.role
      // if no role selected, null is allowed
      const roleID = getIDFromName(roleAnswer)
      // extract the id off the end of the manager name
      const managerAnswer = answer.manager
      // if no manager selected, null is allowed
      const managerID = getIDFromName(managerAnswer)
      return await addEmployee(answer.firstName, answer.lastName, roleID, managerID)
    })
}

// Update an existing Employee's role based on user input
async function updateEmployeeRolePrompts () {
  // get all roles to populate the choice
  // they have (id:xx) at the end of the name so we can extract the id
  const roles = await getAllRoleNames()
  roles.push('No Job Role')
  return inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: chalk.bold.blueBright('Employee:'),
      choices: await getAllEmployeeNames(),
      validate: input => {
        if (input) {
          return true
        } else {
          console.log(chalk.redBright('Please select an employee'))
          return false
        }
      }
    },
    {
      type: 'list',
      name: 'role',
      message: chalk.bold.blueBright('Role:'),
      choices: roles
    }
  ])
    .then(async answer => {
      // extract the id off the end of the role name
      const roleAnswer = answer.role
      // if they selected 'No Job Role' then set the role to null
      const roleID = getIDFromName(roleAnswer)

      // extract the id off the end of the employee name
      const employeeAnswer = answer.employee
      const employeeID = getIDFromName(employeeAnswer)
      if (!employeeID) {
        console.log(chalk.redBright('Please select an employee'))
        return
      }

      return await updateEmployeeRole(employeeID, roleID)
    })
}

// Update employee manager based on user input
async function updateEmployeeManagerPrompts () {
  // get all employees to populate the choices
  // they have (id:xx) at the end of the name so we can extract the id
  const employees = await getAllEmployeeNames()
  // copy employees array and add 'No Manager' to the end
  const managers = [...employees]
  managers.push('No Manager')
  return inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: chalk.bold.blueBright('Employee:'),
      choices: employees,
      validate: input => {
        if (input) {
          return true
        } else {
          console.log(chalk.redBright('Please select an employee'))
          return false
        }
      }
    },
    {
      type: 'list',
      name: 'manager',
      message: chalk.bold.blueBright('Manager:'),
      choices: managers
    }
  ])
    .then(async answer => {
      // extract the id off the end of the manager name
      const managerAnswer = answer.manager
      // can be null if 'No Manager' is selected
      const managerID = getIDFromName(managerAnswer)

      // extract the id off the end of the employee name
      const employeeAnswer = answer.employee
      const employeeID = getIDFromName(employeeAnswer)
      if (!employeeID) {
        console.log(chalk.redBright('Please select an employee'))
        return
      }

      return await updateEmployeeManager(employeeID, managerID)
    })
}

// delete an employee
async function deleteEmployeePrompts () {
  // get all employees to populate the choices
  // they have (id:xx) at the end of the name so we can extract the id
  const employees = await getAllEmployeeNames()
  employees.push('CANCEL')
  return inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: chalk.bold.blueBright('Employee:'),
      choices: employees,
      validate: input => {
        if (input) {
          return true
        } else {
          console.log(chalk.redBright('Please select an employee'))
          return false
        }
      }
    }
  ])
    .then(async answer => {
      // extract the id off the end of the employee name
      const employeeAnswer = answer.employee
      const employeeID = getIDFromName(employeeAnswer)
      if (!employeeID) {
        // if they selected 'Cancel' then return
        return
      }
      return await deleteEmployee(employeeID)
    })
}

// add a new department
async function addDepartmentPrompts () {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: chalk.bold.blueBright('Department Name:'),
      validate: input => {
        if (input) {
          return true
        } else {
          console.log(chalk.redBright('Please enter a department name'))
          return false
        }
      }
    }
  ])
    .then(async answer => {
      return await addDepartment(answer.name)
    })
}

// delete a department
async function deleteDepartmentPrompts () {
  // get all departments to populate the choices
  // they have (id:xx) at the end of the name so we can extract the id
  const departments = await getAllDepartmentNames(true)
  departments.push('CANCEL')
  return inquirer.prompt([
    {
      type: 'list',
      name: 'department',
      message: chalk.bold.blueBright('Department:'),
      choices: departments,
      validate: input => {
        if (input) {
          return true
        } else {
          console.log(chalk.redBright('Please select a department'))
          return false
        }
      }
    }
  ])
    .then(async answer => {
      // extract the id off the end of the department name
      const departmentAnswer = answer.department
      const departmentID = getIDFromName(departmentAnswer)
      if (!departmentID) {
        // if they selected 'Cancel' then return
        return
      }
      return await deleteDepartment(departmentID)
    })
}

// add a new role
async function addRolePrompts () {
  // get all roles to populate the choices
  // they have (id:xx) at the end of the name so we can extract the id
  const roles = await getAllRoleNames()
  // get all departments to populate the choices
  // they have (id:xx) at the end of the name so we can extract the id
  const departments = await getAllDepartmentNames(true)
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: chalk.bold.blueBright('Role Title:'),
      validate: input => {
        if (input) {
          return true
        } else {
          console.log(chalk.redBright('Please enter a role title'))
          return false
        }
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: chalk.bold.blueBright('Role Salary:'),
      validate: input => {
        if (input) {
          return true
        } else {
          console.log(chalk.redBright('Please enter a role salary'))
          return false
        }
      }
    },
    {
      type: 'list',
      name: 'department',
      message: chalk.bold.blueBright('Department:'),
      choices: departments,
      validate: input => {
        if (input) {
          return true
        } else {
          console.log(chalk.redBright('Please select a department'))
          return false
        }
      }
    }
  ])
    .then(async answer => {
      // extract the id off the end of the department name
      const departmentAnswer = answer.department
      // if they selected 'none' then set it to null
      const departmentID = getIDFromName(departmentAnswer)
      return await addRole(answer.title, answer.salary, departmentID)
    })
}

// delete a role
async function deleteRolePrompts () {
  // get all roles to populate the choices
  // they have (id:xx) at the end of the name so we can extract the id
  const roles = await getAllRoleNames()
  roles.push('CANCEL')
  return inquirer.prompt([
    {
      type: 'list',
      name: 'role',
      message: chalk.bold.blueBright('Role:'),
      choices: roles,
      validate: input => {
        if (input) {
          return true
        } else {
          console.log(chalk.redBright('Please select a role'))
          return false
        }
      }
    }
  ])
    .then(async answer => {
      // extract the id off the end of the role name
      const roleAnswer = answer.role
      const roleID = getIDFromName(roleAnswer)
      if (!roleID) {
        // if they selected 'Cancel' then return
        return
      }
      return await deleteRole(roleID)
    })
}

function getIDFromName (name) {
  const match = name.match(/(.*) \(id:(\d+)\)/)
  if (match) {
    const parsedID = parseInt(match[2])
    if (parsedID) {
      return parsedID
    } else {
      // don't return NaN or undefined
      return null
    }
  } else {
    return null
  }
}

module.exports = { splashScreen, mainMenu }
