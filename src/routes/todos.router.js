const express = require('express');

const {
  createTodo,
} = require('../models/todos/todos.model');

const todosRouter = express.Router();

todosRouter.post('/', createTodo);

module.exports = todosRouter;
