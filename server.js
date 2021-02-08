const express = require('express');
const mysql = require('mysql');
const inquirer = require('inquirer')
const PORT = process.env.PORT || 8080;
const app = express();

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