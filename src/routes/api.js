const express = require('express');

const usersRouter = require('./users.router');
const todosRouter = require('./todos.router');

const api = express.Router();

api.use('/users', usersRouter);
api.use('/todos', todosRouter);

module.exports = api;
