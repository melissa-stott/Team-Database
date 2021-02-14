const express = require('express');
const mysql = require('mysql');
const inquirer = require('inquirer');
const { response } = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const cTable = require('console.table');
const util = require('util');

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
    firstQuery();
  });
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

const firstQuery = () => {
    inquirer.prompt(
        {
            type: 'list',
            name: 'startPoint',
            message: 'What would you like to do?',
            choices: ['View data', 'Update Employee Role', 'Add data', 'Exit'],
        }
    ).then((answer) => {
        switch (answer.startPoint) {
            case 'View data':
                viewInfo();
                break;
            case 'Update Employee Role':
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
};

const viewInfo = () => {
    inquirer.prompt(
        {
            type: 'list',
            name: 'viewChoice',
            message: 'What would you like to view?',
            choices: ['Departments', 'Roles', 'Employees'],
        }
    ).then((answer) => {
        if(answer.viewChoice === 'Departments') {
            const query =
            'SELECT * FROM department';
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            firstQuery();
          })  
        } else if (answer.viewChoice === 'Roles') {
            const query = 
            'SELECT * FROM roles';
            connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            firstQuery();
        })
        } else if (answer.viewChoice === 'Employees') {
            const query = 
            'SELECT * FROM employee';
            connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            firstQuery();
        });
    };
})
}

const addInfo = () => {
    inquirer.prompt (
        {
            type: 'list',
            name: 'viewChoice',
            message: 'Which table would you like to add information into?',
            choices: ['Departments', 'Roles', 'Employees'],
        }
    ).then ((answer) => {
        console.log(answer);
        if(answer.viewChoice === 'Departments') {
            inquirer.prompt ([
                {
                    type: 'input',
                    name: 'newName',
                    message: 'What is the name of the department?'
                }
            ]).then((answers) => {
                connection.query (

                    'INSERT INTO department SET ?',
                    {
                        name: answers.newName
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log('New department successfully created');
                        firstQuery();
                    }
                );
        })  
        } else if (answer.viewChoice === 'Roles') {
            connection.query('SELECT * FROM department', (err, res) => {
                if (err) throw err;
            inquirer.prompt ([
                {
                    type: 'input',
                    name: 'newTitle',
                    message: 'Please provide the title of the new position'
                },
                {
                    type: 'input',
                    name: ['newSalary'],
                    message: 'What is the salary for this position?'
                },
                {
                    type: 'list',
                    name: 'deptChoice',
                    message: 'Please select the department for this new role',
                    choices() {
                        const choiceArray = [];
                        res.forEach(({ id, name }) => {
                          choiceArray.push(id + " - " + name);
                        });
                        return choiceArray;
                    },
                }
            ]).then((answers) => {
                console.log(answers);
                connection.query (

                    'INSERT INTO roles SET ?',
                    {
                        title: answers.newTitle,
                        salary: answers.newSalary,
                        department_id: answers.deptChoice[0]
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log('New role successfully created');
                        firstQuery();
                    }
                );
            })  
        });
        }
            else if (answer.viewChoice === 'Employees') {
                connection.query('SELECT * FROM roles', (err, res) => {
                    if (err) throw err;
                inquirer.prompt ([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'What is the employees first name?'
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'What is the employees last name?'
                    },
                    {
                        type: 'list',
                        name: 'roleChoice',
                        message: 'Please select the role for this new employee',
                        choices() {
                            const choiceArray = [];
                            res.forEach(({ department_id, title }) => {
                            choiceArray.push(department_id + " - " + title);
                            });
                            return choiceArray;
                        },
                    }
                ]).then((answers) => {
                    console.log(answers);
                    connection.query (

                        'INSERT INTO employee SET ?',
                        {
                            first_name: answers.firstName,
                            last_name: answers.lastName,
                            role_id: answers.roleChoice[0]
                        },
                        (err, res) => {
                            if (err) throw err;
                            console.log('New employee successfully created');
                            firstQuery();
                        }
                    );
                })  
            });
        };
    })
}
const updateInfo = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
    inquirer.prompt (
        {
            type: 'list',
            name: 'updateRole',
            message: 'Which employee would you like to update the role for?',
            choices() {
                const choiceArray = [];
                res.forEach(({ role_id, first_name, last_name}) => {
                choiceArray.push(role_id + " - " + first_name + " " + last_name);
                });
                return choiceArray;
            },
        } .then ((answers) => {console.log(answers);
            connection.query('SELECT * FROM roles', (err, res) => {
                if (err) throw err;
            inquirer.prompt (
                {
                    type: 'list',
                    name: 'newRole',
                    message: 'Which of these roles would like to choose?',
                    choices() {
                        const choiceArray = [];
                        res.forEach(({title}) => {
                        choiceArray.push(title);
                        });
                        return choiceArray;
                    },
                }.then
                'UPDATE employee SET ?',
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    role_id: answers.roleChoice[0]
                },
                (err, res) => {
                    if (err) throw err;
                    console.log('New employee successfully created');
                    firstQuery();
                },
         