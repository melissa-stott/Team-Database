const express = require('express');
const mysql = require('mysql');
const inquirer = require('inquirer');
const { response } = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '5r00+sql',
    database: 'workforce_DB',
  });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
  });
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

  const firstQuery = () => {
      inquirer.prompt(
          {
              type: 'list',
              name: 'startPoint',
              message: 'What would you like to do?',
              choices: ['View data', 'Update data', 'Add data', 'Exit'],
          }
      ).then((answer) => {
          switch (answer.startPoint) {
              case 'View data':
                  viewInfo();
                  break;
              case 'Update data':
                  updateInfo();
                  break;
              case 'Add data':
                  addInfo();
                  break;
              case 'Exit':
                  connection.end();
                  break;          
              }
      })
  }

  