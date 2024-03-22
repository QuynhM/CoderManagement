const Joi = require('joi');

const userValidation = Joi.object({
  name: Joi.string().required(),
  role: Joi.string().valid('manager', 'employee').default('employee'),
});

const getAllUserValidation = Joi.object({
  name: Joi.string(),
  role: Joi.string().valid('manager', 'employee').default('employee'),
});

const searchUsersValidation = Joi.object({
  name: Joi.string().required(),
});

const taskValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('pending', 'working', 'review', 'done', 'archive').required(),
  isDeleted: Joi.boolean().default(false)
});

const browseTaskValidation = Joi.object({
  name: Joi.string(),
  isDeleted: Joi.boolean().default(false),
  status: Joi.string().valid('pending', 'working', 'review', 'done', 'archive')
});

const updateTaskValidation = Joi.object({
  status: Joi.string().valid('pending', 'working', 'review', 'done', 'archive').required(),
});

const softDeleteTaskValidation = Joi.object({
  taskId: Joi.string().required(),
});

module.exports = {
  userValidation,
  getAllUserValidation,
  searchUsersValidation,
  taskValidation,
  browseTaskValidation,
  updateTaskValidation,
  softDeleteTaskValidation
};