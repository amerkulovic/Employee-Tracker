const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "Larrybird33",
    database: "tracker",
  },
  console.log(`Connected to the tracker database.`)
);
viewDepartments = () => {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
  });
};

viewRoles = () => {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
  });
};

viewEmployees = () => {
  db.query("SELECT * FROM employee INNER JOIN role ON employee.role_id=role.id;", function (err, results) {
    console.table(results);
  });
};

addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the Department name?",
        name: "departmentName",
      },
    ])
    .then((answer) => {
      db.connect(function (err) {
        db.query(`INSERT INTO department (name) VALUES ('${answer.departmentName}')`, function (err, result) {
          console.table("Successfully added!");
        });
      });
    });
};

addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the role name?",
        name: "roleName",
      },
      {
        type: "input",
        message: "What is the role salary?",
        name: "roleSalary",
      },
      {
        type: "input",
        message: "What is the role department?",
        name: "roleDepartment",
      },
    ])
    .then((answer) => {
      db.connect(function (err) {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answer.roleName}', '${answer.roleSalary}', ${answer.roleDepartment})`, function (err, result) {
          console.table("Successfully added!");
        });
      });
    });
};

addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "employeeFirstName",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "employeeLastName",
      },
      {
        type: "input",
        message: "What is the employee's role id?",
        name: "employeeRole",
      },
      {
        type: "input",
        message: "Who is the employee's manager id?",
        name: "employeeManager",
      },
    ])
    .then((answer) => {
      db.connect(function (err) {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.employeeFirstName}', '${answer.employeeLastName}', '${answer.employeeRole}', '${answer.employeeManager}')`, function (err, result) {
          console.table("Successfully added!");
        });
      });
    });
};

updateRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name of the employee who's role you want to change?",
        name: "employeeFirstName",
      },
      {
        type: "input",
        message: "What is the last name of the employee who's role you want to change?",
        name: "employeeLastName",
      },
      {
        type: "input",
        message: "What should the employee's role ID be changed to?",
        name: "employeeNewRole",
      },
    ])
    .then((answer) => {
      db.connect(function (err) {
        db.query(`UPDATE employee SET role_id = '${answer.employeeNewRole}' WHERE first_name = '${answer.employeeFirstName}' AND last_name = '${answer.employeeLastName}'`, function (err, result) {
          console.log(result.affectedRows + " record(s) updated");
        });
      });
    });
};

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to view?",
        name: "choice",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update a Role"],
      },
    ])
    .then((data) => {
      if (data.choice === "View All Departments") {
        viewDepartments();
      } else if (data.choice === "View All Roles") {
        viewRoles();
      } else if (data.choice === "View All Employees") {
        viewEmployees();
      } else if (data.choice === "Add a Department") {
        addDepartment();
      } else if (data.choice === "Add a Role") {
        addRole();
      } else if (data.choice === "Add an Employee") {
        addEmployee();
      } else {
        updateRole();
      }
    });
}

init();
