const express = require('express');

const {
  httpCreateTodo,
  httpToggleTodo,
  httpDeleteTodo,
  httpPermanentlyDeleteTodo,
  httpRestoreTodo,
  httpEditTodo,
  httpGetUserTodos,
  httpGetUserPaginatedTodos,
  httpGetUserTodo,
} = require('../controllers/todos.controller');

const { authMiddleware } = require('../middlewares/users.middleware');

const todosRouter = express.Router();

todosRouter.post('/', authMiddleware, httpCreateTodo);
todosRouter.patch('/:todoId', authMiddleware, httpToggleTodo);
todosRouter.delete('/:todoId', authMiddleware, httpDeleteTodo);
todosRouter.delete('/permanently/:todoId', authMiddleware, httpPermanentlyDeleteTodo);
todosRouter.patch('/restore/:todoId', authMiddleware, httpRestoreTodo);
todosRouter.patch('/edit/:todoId', authMiddleware, httpEditTodo);
todosRouter.get('/', authMiddleware, httpGetUserTodos);
todosRouter.get('/paginated', authMiddleware, httpGetUserPaginatedTodos);
todosRouter.get('/:todoId', authMiddleware, httpGetUserTodo);


module.exports = todosRouter;
