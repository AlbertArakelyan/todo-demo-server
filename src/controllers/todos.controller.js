const {
  validateTodo,
  createTodo,
} = require('../models/todos/todos.model');

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

module.exports = {
  httpCreateTodo,
};