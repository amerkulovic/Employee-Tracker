const inquirer = require("inquirer");
const express = require("express");
const mySql = require("mysql2");
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

function viewFile() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to view?",
        name: "choice",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Role", "Add an Employee", "Update a Role"],
      },
    ])
    .then((data) => {
      console.log(data);
      if (data.choice === "View All Roles") {
        console.log("Dumbo");
      }
    });
}

viewFile();
