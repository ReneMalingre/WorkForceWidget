const { outputGreenBoldText, outputYellowText, outputRedText } = require('./utils')

function splashScreen () {
  const arr = [
    '__        __         _        _____',
    '\\ \\      / /__  _ __| | __   |  ___|__  _ __ ___ ___',
    " \\ \\ /\\ / / _ \\| '__| |/ /   | |_ / _ \\| '__/ __/ _ \\",
    '  \\ V  V / (_) | |  |  <     |  _| (_) | | | (_|  __/',
    '   \\_/\\_/ \\___/|_|  |_|\\_\\    |_|  \\___/|_|  \\___\\___|',
    '',
    '     __        ___     _            _',
    '     \\ \\      / (_) __| | __ _  ___| |_',
    '      \\ \\ /\\ / /| |/ _` |/ _` |/ _ \\ __|',
    '       \\ V  V / | | (_| | (_| |  __/ |_',
    '        \\_/\\_/  |_|\\__,_|\\__, |\\___|\\__|',
    '                         |___/'
  ]
  console.clear()

  for (let i = 0; i < arr.length; i++) {
    outputGreenBoldText(arr[i])
  }
}

const inquirer = require('inquirer')
const chalk = require('chalk')

function mainMenu () {
  console.log('')
  inquirer.prompt([
    {
      type: 'list',
      name: 'main',
      message: chalk.bgGreen('Main menu:'),
      choices: [
        'View Information',
        'Employee Management',
        'Role Management',
        'Department Management',
        'Exit Work Force Widget'
      ]
    }
  ])
    .then(answer => {
      switch (answer.main) {
        case 'View Information':
          return viewInformationMenu().then(() => mainMenu())
        case 'Employee Management':
          return employeeMenu().then(() => mainMenu())
        case 'Role Management':
          return roleMenu().then(() => mainMenu())
        case 'Department Management':
          return departmentMenu().then(() => mainMenu())
        case 'Exit Work Force Widget':
          outputYellowText('Result: : Exit Work Force Widget')
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
        'List all Departments',
        'List all Employees',
        'List all Roles',
        'View Employees by Manager',
        'View Employees by Department',
        'View Total Utilised Budget by Department',
        'Back to Main Menu'
      ]
    }
  ])
    .then(answer => {
      switch (answer.view) {
        case 'List all Departments':
          outputYellowText('Result: : List all Departments')
          break
        case 'List all Employees':
          outputYellowText('Result: : List all Employees')
          break
        case 'List all Roles':
          outputYellowText('Result: : List all Roles')
          break
        case 'View Employees by Manager':
          outputYellowText('Result: : View Employees by Manager')
          break
        case 'View Employees by Department':
          outputYellowText('Result: : View Employees by Department')
          break
        case 'View Total Utilised Budget by Department':
          outputYellowText('Result: : View Total Utilised Budget by Department')
          break
        case 'Back to Main Menu':
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
        'Add Employee',
        'Update Employee Role',
        'Update Employee Manager',
        'Delete Employee',
        'Back to Main Menu'
      ]
    }
  ])
    .then(answer => {
      switch (answer.employee) {
        case 'Add Employee':
          outputYellowText('Result: : Add Employee')
          break
        case 'Update Employee Role':
          outputYellowText('Result: : Update Employee Role')
          break
        case 'Update Employee Manager':
          outputYellowText('Result: : Update Employee Manager')
          break
        case 'Delete Employee':
          outputYellowText('Result: : Delete Employee')
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
        'Add Role',
        'Update Role',
        'Delete Role',
        'Back to Main Menu'
      ]
    }
  ])
    .then(answer => {
      switch (answer.role) {
        case 'Add Role':
          outputYellowText('Result: : Add Role')
          break
        case 'Update Role':
          outputYellowText('Result: : Update Role')
          break
        case 'Delete Role':
          outputYellowText('Result: : Delete Role')
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
      message: chalk.bold.blueBright('Department Management:'),
      choices: [
        'Add Department',
        'Update Department',
        'Delete Department',
        'Back to Main Menu'
      ]
    }
  ])
    .then(answer => {
      switch (answer.department) {
        case 'Add Department':
          outputYellowText('Result: : Add Department')
          break
        case 'Update Department':
          outputYellowText('Result: : Update Department')
          break
        case 'Delete Department':
          outputYellowText('Result: : Delete Department')
          break
        case 'Back to Main Menu':
      }
    })
}

module.exports = { splashScreen, mainMenu }
