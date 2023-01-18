const inquirer = require("inquirer");
const express = require("express");
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

function viewFile() {
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
      }
    });
}

viewFile();
