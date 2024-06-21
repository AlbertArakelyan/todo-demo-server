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
todosRouter.patch('/:id', authMiddleware, httpToggleTodo);
todosRouter.delete('/:id', authMiddleware, httpDeleteTodo);
todosRouter.delete('/permanently/:id', authMiddleware, httpPermanentlyDeleteTodo);
todosRouter.patch('/restore/:id', authMiddleware, httpRestoreTodo);
todosRouter.patch('/edit/:id', authMiddleware, httpEditTodo);
todosRouter.get('/user', authMiddleware, httpGetUserTodos);
todosRouter.get('/user/paginated', authMiddleware, httpGetUserPaginatedTodos);
todosRouter.get('/user/:id', authMiddleware, httpGetUserTodo);


module.exports = todosRouter;
