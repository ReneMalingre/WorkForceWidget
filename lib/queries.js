// Runs the Queries from Main Menu

// database connection
const { getConnection } = require('./db')
const chalk = require('chalk')
const Table = require('cli-table3')

// View All Departments
async function viewAllDepartments () {
  const query = 'SELECT id, name as Department FROM department Order By name'
  const params = []
  const tableDescription = 'All Departments'
  return await runQuery(query, params, tableDescription)
}

// Get All Department Names in an Array
async function getAllDepartmentNames (addID = false) {
  let query = ''
  if (addID) {
    query = `SELECT 
      Concat(
        name, ' (id:', id, ')'
      ) as Department
      FROM 
        department`
  } else {
    query = 'SELECT name as Department FROM department'
  }
  query += ' Order By name'
  const params = []
  const departmentNames = []
  const rows = await runQuery(query, params)
  if (!rows) return departmentNames

  for (let i = 0; i < rows.length; i++) {
    departmentNames.push(rows[i].Department)
  }
  return departmentNames
}

// Get All Manager Names in an Array
async function getAllManagerNames () {
  const query = `Select distinct
    Concat(
        employee.last_name, ", ", employee.first_name, ' (id:', employee.id, ')'
    ) As Manager
From
    employee Inner Join
    employee employee1 On employee1.manager_id = employee.id
Order By
    Manager;`
  const params = []
  const managerNames = []
  const rows = await runQuery(query, params)
  if (!rows) return managerNames

  for (let i = 0; i < rows.length; i++) {
    managerNames.push(rows[i].Manager)
  }
  return managerNames
}

// Get All Employee Names in an Array
async function getAllEmployeeNames () {
  const query = `Select distinct
    Concat(
        employee.last_name, ", ", employee.first_name, ' (id:', employee.id, ')'
    ) As Employee
From
    employee 
Order By
    Employee;`
  const params = []
  const employeeNames = []
  const rows = await runQuery(query, params)
  if (!rows) return employeeNames

  for (let i = 0; i < rows.length; i++) {
    employeeNames.push(rows[i].Employee)
  }
  return employeeNames
}

// Get all roles in an array, with id at the end, sorted by department
async function getAllRoleNames () {
  const query = `SELECT
    Concat(
    role.title, ' (id:', role.id,')'
    ) as Role
FROM
    role
LEFT JOIN
    department
ON
    role.department_id = department.id
ORDER BY department.name, role.title;`
  const params = []
  const roles = []
  const rows = await runQuery(query, params)
  if (!rows) return roles

  for (let i = 0; i < rows.length; i++) {
    roles.push(rows[i].Role)
  }
  return roles
}

// View All Employees
async function viewAllEmployees () {
  const query = `Select
    employee.id,
    employee.last_name As Last_Name,
    employee.first_name As First_Name,
    CONCAT(employee1.last_name , ', ',  employee1.first_name) as Manager,
    role.title As Role,
    CONCAT('$', FORMAT(role.salary, 2, 'en_AU')) As Salary,
    department.name As Department
From
    employee Left Join
    role On employee.role_id = role.id Left Join
    department On role.department_id = department.id Left Join
    employee employee1 On employee.manager_id = employee1.id
Order By
    Department,
    Last_Name,
    First_Name;`
  const params = []
  const tableDescription = 'All Employees'
  return await runQuery(query, params, tableDescription)
}

// View All Roles
async function viewAllRoles () {
  const query = `SELECT 
        role.id, 
        role.title as Role,
        CONCAT('$', FORMAT(role.salary, 2, 'en_AU')) as Salary,
        department.name as Department
    FROM 
        role
    LEFT JOIN 
        department 
    ON 
        role.department_id = department.id
    ORDER BY department.name, role.title;`

  const params = []
  const tableDescription = 'All Roles'
  return await runQuery(query, params, tableDescription)
}

// View total utilised budget by department
async function viewTotalUtilisedBudgetByDepartment (departmentName) {
  let query = ''
  let params = []
  let tableDescription = ''
  if (departmentName) {
    // specific department
    tableDescription = `Total Utilised Budget in the ${departmentName} Department`
    params = [departmentName]
    query = `Select
    department.name as Department,
    CONCAT('$', FORMAT(SUM(role.salary), 2, 'en_AU')) as Total_Budget
From
    department Inner Join
    role On role.department_id = department.id Inner Join
    employee On employee.role_id = role.id
Where
    department.name = ?
Group by
    department.name;`
  } else {
    // all departments
    tableDescription = 'Total Utilised Budget by Department'
    query = `Select
    department.name as Department,
    CONCAT('$', FORMAT(SUM(role.salary), 2, 'en_AU')) as Total_Budget
From
    department Inner Join
    role On role.department_id = department.id Inner Join
    employee On employee.role_id = role.id
Group by
    department.name
Order By
    department.name;`
  }
  return await runQuery(query, params, tableDescription)
}

// View Employees by Manager
async function viewEmployeesByManager (managerId, managerName) {
  let query = ''
  let params = []
  let tableDescription = ''
  if (managerName) {
    // specific manager
    tableDescription = `Employees Managed by ${managerName}`
    params = [managerId]
    query = `Select
    employee.id,
    employee.last_name as Last_Name, 
    employee.first_name as First_Name,
    role.title As Role,
    CONCAT('$', FORMAT(role.salary, 2, 'en_AU')) As Salary,
    department.name As Department
From
    employee Left Join
    role On employee.role_id = role.id Left Join
    department On role.department_id = department.id
Where
    employee.manager_id = ?
Order By
    employee.last_name, 
    employee.first_name;`
  } else {
    // all managers
    tableDescription = 'Employees by Manager (All)'
    query = `Select
    employee.id,
    employee.last_name,
    employee.first_name,
    role.title As Role,
    CONCAT('$', FORMAT(role.salary, 2, 'en_AU')) As Salary,
    department.name As Department,
    concat(employee1.last_name, ', ', employee1.first_name) as Manager
From
    employee Left Join
    role On employee.role_id = role.id Left Join
    department On role.department_id = department.id Inner Join
    employee employee1 On employee.manager_id = employee1.id
Order By
    Manager,
    employee.last_name,
    employee.first_name;`
  }
  return await runQuery(query, params, tableDescription)
}

// View Employees by Department
async function viewEmployeesByDepartment (departmentName) {
  let query = ''
  let params = []
  let tableDescription = ''
  if (departmentName) {
    // specific department
    tableDescription = `Employees in the ${departmentName} Department`
    params = [departmentName]
    query = `Select
        employee.id,
        employee.last_name as Last_Name,
        employee.first_name as First_Name,
        role.title As Role,
        CONCAT('$', FORMAT(role.salary, 2, 'en_AU')) As Salary,
        department.name As Department
    From
        employee Left Join
        role On employee.role_id = role.id Left Join
        department On role.department_id = department.id
    Where
        department.name = ?
    Order By
        employee.last_name,
        employee.first_name;`
  } else {
    // all departments
    tableDescription = 'Employees by Department (All)'
    query = `Select
        employee.id,
        employee.last_name as Last_Name,
        employee.first_name as First_Name,
        role.title As Role,
        CONCAT('$', FORMAT(role.salary, 2, 'en_AU')) As Salary,
        department.name As Department
    From
        employee Left Join
        role On employee.role_id = role.id Left Join
        department On role.department_id = department.id
    Order By
        department.name,
        employee.last_name,
        employee.first_name;`
  }
  return await runQuery(query, params, tableDescription)
}

// Add a new employee
async function addEmployee (firstName, lastName, roleId, managerId) {
  const query = `INSERT INTO 
        employee (first_name, last_name, role_id, manager_id) 
    VALUES (?, ?, ?, ?)`
  const params = [firstName, lastName, roleId, managerId]
  return await runQuery(query, params)
}

// Update an employee's role
async function updateEmployeeRole (employeeId, roleId) {
  const query = `UPDATE
        employee
    SET
        role_id = ?
    WHERE
        id = ?`
  const params = [roleId, employeeId]
  return await runQuery(query, params)
}

// Update an employee's manager
async function updateEmployeeManager (employeeId, managerId) {
  const query = `UPDATE
        employee
    SET
        manager_id = ?
    WHERE
        id = ?`
  const params = [managerId, employeeId]
  return await runQuery(query, params)
}

// Add a department
async function addDepartment (departmentName) {
  const query = `INSERT INTO
        department (name)
    VALUES (?)`
  const params = [departmentName]
  return await runQuery(query, params)
}

// Delete a department
async function deleteDepartment (departmentId) {
  const query = `DELETE FROM
        department
    WHERE
        id = ?`
  const params = [departmentId]
  return await runQuery(query, params)
}

// Add a role
async function addRole (roleTitle, roleSalary, departmentId) {
  const query = `INSERT INTO
        role (title, salary, department_id)
    VALUES (?, ?, ?)`
  const params = [roleTitle, roleSalary, departmentId]
  return await runQuery(query, params)
}

// Delete a role
async function deleteRole (roleId) {
  const query = `DELETE FROM
        role
    WHERE
        id = ?`
  const params = [roleId]
  return await runQuery(query, params)
}

// Delete an employee
async function deleteEmployee (employeeId) {
  const query = `DELETE FROM
        employee
    WHERE
        id = ?`
  const params = [employeeId]
  return await runQuery(query, params)
}

// generic function to run a query and optionally display the results in a table
async function runQuery (query, params, tableDescription = '') {
  const connection = await getConnection()
  if (!connection) {
    console.log(chalk.red('Error connecting to the database.'))
    return null
  }
  // query database
  try {
    const [rows] = await connection.execute(query, params)

    // display results in a table if a tableDescription has been defined
    if (tableDescription) {
      const lineLength = 40
      console.log('')
      console.log(chalk.green('_'.repeat(lineLength)))
      console.log(chalk.green(tableDescription + ':'))
      convertToTable(rows, tableDescription)
      console.log(chalk.green('_'.repeat(lineLength)))
    }
    return rows
  } catch (error) {
    console.error('Error: ' + error.message)
    return null
  }
}

// convert query results into a table using cli-table3
// for some reason it fails to display the table if there are more than 25 rows
// and I couldn't find a way to fix it so I've added a loop to display the results
// 25 rows at a time
function convertToTable (rows, tableDescription) {
  const rowCount = rows.length

  if (!rowCount) {
    console.log(chalk.blue('No data returned.'))
    return
  }
  const totalPages = Math.ceil(rowCount / 25)
  let currentPage = 0
  do {
    // do 25 rows at a time
    currentPage++
    if (totalPages > 1) {
      console.log(chalk.blue(tableDescription + ': Page ' + currentPage + ' of ' + totalPages))
    }
    const rowsToDisplay = rows.splice(0, 25)
    displayTable(rowsToDisplay)
  } while (rows.length)
}

function displayTable (rows) {
  const table = new Table({
    head: Object.keys(rows[0]),
    style: {
      head: ['green'],
      border: ['blue'],
      compact: true
    }
  })
  rows.forEach(row => {
    table.push(Object.values(row))
  })
  console.log(table.toString())
}

module.exports = {
  viewAllDepartments,
  viewAllEmployees,
  viewAllRoles,
  viewTotalUtilisedBudgetByDepartment,
  getAllDepartmentNames,
  getAllManagerNames,
  getAllEmployeeNames,
  getAllRoleNames,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  deleteEmployee,
  addDepartment,
  deleteDepartment,
  addRole,
  deleteRole,
  viewEmployeesByManager,
  viewEmployeesByDepartment
}
