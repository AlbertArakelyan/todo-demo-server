const {
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
} = require('../models/todos/todos.model');

const { getPagination, getPaginatedDate } = require('../helpers/pagination');

const httpStatuses = require('../constants/httpStatuses');
const { todoControllerMessages, smthWentWrong } = require('../constants/controllerMessages');

async function httpCreateTodo(req, res) {
  try {
    const todo = req.body;
    const userId = req.user.id;

    const newTodo = {
      ...todo,
      userId,
      isCompleted: false,
    };

    const error = validateTodo(newTodo);

    if (error) {
      return res.status(httpStatuses.badRequest).json({
        success: false,
        message: error.details[0].message,
        statusCode: httpStatuses.badRequest,
      });
    }

    const createdTodo = await createTodo(newTodo);

    return res.status(httpStatuses.created).json({
      success: true,
      data: createdTodo,
      message: todoControllerMessages.todoCreated,
      statusCode: httpStatuses.created,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatuses.serverError).json({
      success: false,
      message: error.message || smthWentWrong,
      statusCode: httpStatuses.serverError,
    });
  }
}

async function httpToggleTodo(req, res) {
  try {
    const { todoId } = req.params;
    const userId = req.user.id;

    const updatedTodo = await toggleTodo(todoId, userId);

    if (!updatedTodo) {
      return res.status(httpStatuses.notFound).json({
        success: false,
        message: todoControllerMessages.todoNotFound,
        statusCode: httpStatuses.notFound,
      });
    }

    return res.status(httpStatuses.ok).json({
      success: true,
      data: updatedTodo,
      message: todoControllerMessages.todoUpdated,
      statusCode: httpStatuses.ok,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatuses.serverError).json({
      success: false,
      message: error.message || smthWentWrong,
      statusCode: httpStatuses.serverError,
    });
  }
}

async function httpDeleteTodo(req, res) {
  try {
    const { todoId } = req.params;

    const deletedTodoId = await deleteTodo(todoId);

    if (!deletedTodoId) {
      return res.status(httpStatuses.notFound).json({
        success: false,
        message: todoControllerMessages.todoNotFound,
        statusCode: httpStatuses.notFound,
      });
    }

    return res.status(httpStatuses.ok).json({
      success: true,
      data: {
        todoId: deletedTodoId,
        isDeleted: true,
      },
      message: todoControllerMessages.todoDeleted,
      statusCode: httpStatuses.ok,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatuses.serverError).json({
      success: false,
      message: error.message || smthWentWrong,
      statusCode: httpStatuses.serverError,
    });
  }
}

async function httpPermanentlyDeleteTodo(req, res) {
  try {
    const { todoId } = req.params;

    const deletedTodo = await permanentlyDeleteTodo(todoId);

    if (!deletedTodo) {
      return res.status(httpStatuses.notFound).json({
        success: false,
        message: todoControllerMessages.todoNotFound,
        statusCode: httpStatuses.notFound,
      });
    }

    return res.status(httpStatuses.ok).json({
      success: true,
      data: {
        todoId,
        isPermanentlyDeleted: true,
      },
      message: todoControllerMessages.todoPermanentlyDeleted,
      statusCode: httpStatuses.ok,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatuses.serverError).json({
      success: false,
      message: error.message || smthWentWrong,
      statusCode: httpStatuses.serverError,
    });
  }
}

async function httpRestoreTodo(req, res) {
  try {
    const { todoId } = req.params;

    const restoredTodoId = await restoreTodo(todoId);

    if (!restoredTodoId) {
      return res.status(httpStatuses.notFound).json({
        success: false,
        message: todoControllerMessages.todoNotFound,
        statusCode: httpStatuses.notFound,
      });
    }

    return res.status(httpStatuses.ok).json({
      success: true,
      data: {
        todoId: restoredTodoId,
        isRestored: true,
      },
      message: todoControllerMessages.todoRestored,
      statusCode: httpStatuses.ok,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatuses.serverError).json({
      success: false,
      message: error.message || smthWentWrong,
      statusCode: httpStatuses.serverError,
    });
  }
}

async function httpEditTodo(req, res) {
  try {
    const { todoId } = req.params;
    const userId = req.user.id;
    const todo = req.body;

    const updatedTodo = await editTodo(todoId, todo);

    if (!updatedTodo) {
      return res.status(httpStatuses.notFound).json({
        success: false,
        message: todoControllerMessages.todoNotFound,
        statusCode: httpStatuses.notFound,
      });
    }

    return res.status(httpStatuses.ok).json({
      success: true,
      data: updatedTodo,
      message: todoControllerMessages.todoUpdated,
      statusCode: httpStatuses.ok,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatuses.serverError).json({
      success: false,
      message: error.message || smthWentWrong,
      statusCode: httpStatuses.serverError,
    });
  }
}

async function httpGetUserTodos(req, res) {
  try {
    const isCompleted = req.query.isCompleted;
    const userId = req.user.id;

    const todos = await getUserTodos(userId, isCompleted);

    return res.status(httpStatuses.ok).json({
      success: true,
      data: todos,
      message: todoControllerMessages.todosReceived,
      statusCode: httpStatuses.ok,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatuses.serverError).json({
      success: false,
      message: error.message || smthWentWrong,
      statusCode: httpStatuses.serverError,
    });
  }
}

async function httpGetUserPaginatedTodos(req, res) {
  try {
    const isCompleted = req.query.isCompleted;
    const userId = req.user.id;

    const { page, limit: perPage } = req.query;
    const { skip, limit } = getPagination(req.query);

    const todos = await getUserTodosPaginated(userId, skip, limit, isCompleted);
    const todosCount = await getUserTodosCount(userId, isCompleted);
    const paginatedTodos = getPaginatedDate(todos, page, perPage, todosCount);

    return res.status(httpStatuses.ok).json({
      success: true,
      data: paginatedTodos,
      message: todoControllerMessages.todosReceived,
      statusCode: httpStatuses.ok,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatuses.serverError).json({
      success: false,
      message: error.message || smthWentWrong,
      statusCode: httpStatuses.serverError,
    });
  }
}

async function httpGetUserTodo(req, res) {
  try {
    const { todoId } = req.params;

    const todo = await getUserTodo(todoId);

    if (!todo) {
      return res.status(httpStatuses.notFound).json({
        success: false,
        message: todoControllerMessages.todoNotFound,
        statusCode: httpStatuses.notFound,
      });
    }

    return res.status(httpStatuses.ok).json({
      success: true,
      data: todo,
      message: todoControllerMessages.todoReceived,
      statusCode: httpStatuses.ok,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatuses.serverError).json({
      success: false,
      message: error.message || smthWentWrong,
      statusCode: httpStatuses.serverError,
    });
  }
}

module.exports = {
  httpCreateTodo,
  httpToggleTodo,
  httpDeleteTodo,
  httpPermanentlyDeleteTodo,
  httpRestoreTodo,
  httpEditTodo,
  httpGetUserTodos,
  httpGetUserPaginatedTodos,
  httpGetUserTodo,
};
