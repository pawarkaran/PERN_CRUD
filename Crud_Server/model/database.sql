CREATE DATABASE crud;

CREATE TABLE tbl_todo
(
    todo_id SERIAL NOT NULL,
    todo_desc VARCHAR(255) NOT NULL
);