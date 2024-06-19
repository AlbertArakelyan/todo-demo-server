const Joi = require('joi');

const {
  minValidationLength,
} = require('../../constants/validation');

const todoSchema = Joi.object({
  title: Joi.string().required().min(minValidationLength.base),
  description: Joi.string(),
  isCompleted: Joi.boolean().required(),
  isDeleted: Joi.boolean(),
  userId: Joi.string().required(),
});

module.exports = {
  todoSchema,
};