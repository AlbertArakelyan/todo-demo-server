const Todo = require('./todos.mongo');
const { todoSchema } = require('../../utils/schemas/todos.schema');

function validateTodo(todo) {
  const { error } = todoSchema.validate(todo);

  return error;
}

async function createTodo(todo) {
  const newTodo = new Todo(todo);
  
  await newTodo.save();

  return newTodo;
}

module.exports = {
  validateTodo,
  createTodo,
};
