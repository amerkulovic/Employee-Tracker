const inquirer = require("inquirer");
const express = require("express");

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
    });
}

viewFile();
