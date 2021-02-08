DROP DATABASE IF EXISTS workforce_DB;

CREATE DATABASE workforce_DB;

USE workforce_DB;

CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR (30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL (10,2) NOT NULL,
    department_id INTEGER NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Accounting");

INSERT INTO roles (title, salary, department_id)
VALUES ("Salesperson", 75000.00, 1), ("Backend Developer", 150000.00, 2), ("Accounts Payable Clerk", 60000.00, 3);
