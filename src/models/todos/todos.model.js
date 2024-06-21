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

async function toggleTodo(id, userId) {
  const todo = await Todo.find({ _id: id, userId });
  todo.isCompleted = !todo.isCompleted;

  await todo.save();

  return todo;
}

async function deleteTodo(id) {
  const todo = await Todo.findById(id);
  todo.isDeleted = true;

  await todo.save();

  return todo._id;
}

async function permanentlyDeleteTodo(id) {
  return await Todo.findByIdAndDelete(id);
}

async function restoreTodo(id) {
  const todo = await Todo.findById(id);
  todo.isDeleted = false;

  await todo.save();

  return todo._id;
}

async function editTodo(id, todo) {
  return await Todo.findByIdAndUpdate(id, todo, { new: true });
}

async function getUserTodos(userId, isCompleted) {
  if (isCompleted) {
    return await Todo.find({ userId, isCompleted: !!Number(isCompleted), isDeleted: false }).sort({ createdAt: -1 });
  }

  return await Todo.find({ userId, isDeleted: false }).sort({ createdAt: -1 });
}

async function getUserTodosPaginated(userId, skip, limit, isCompleted) {
  if (isCompleted) {
    return await Todo
      .find({ userId, isCompleted: !!Number(isCompleted), isDeleted: false })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
  }

  return await Todo
    .find({ userId, isDeleted: false })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
}

async function getUserTodo(id) {
  return await Todo.findById(id);
}

async function getUserTodosCount(userId, isCompleted) {
  if (isCompleted) {
    return await Todo.countDocuments({ userId, isCompleted: !!Number(isCompleted), isDeleted: false });
  }

  return await Todo.countDocuments({ userId, isDeleted: false });
}

module.exports = {
  validateTodo,
  createTodo,
  toggleTodo,
  deleteTodo,
  permanentlyDeleteTodo,
  restoreTodo,
  editTodo,
  getUserTodos,
  getUserTodosPaginated,
  getUserTodo,
  getUserTodosCount,
};
