const User = require('../models/User');
const Task = require('../models/Task');
const { AppError, sendResponse } = require('../helpers/utils');
const { userValidation, searchUsersValidation, getAllUserValidation } = require('./validationSchema');

const createUser = async (req, res, next) => {
  try {
		const validationResult = userValidation.validate(req.body);
        if (validationResult.error) {
            throw new AppError(400, "Bad Request", validationResult.error.message);
        }

		const created= await User.create(validationResult.value);
		sendResponse(res,200,true,created,null,"Create User Success");
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const validationResult = getAllUserValidation.validate(req.query);
        if (validationResult.error) {
            throw new AppError(400, "Bad Request", validationResult.error.message);
        }

    const users = await User.find(req.query);
	  sendResponse(res, 200, true, { users }, null, "Found list of users success");
  } catch (err) {
    next(err);
  }
};

const searchEmployeeByName = async (req, res, next) => {
  try {
    const validationResult = searchUsersValidation.validate(req.query);
    if (validationResult.error) {
        throw new AppError(400, "Bad Request", validationResult.error.message);
    }

    const { name } = validationResult.value; 

    const users = await User.find({ name: { $regex: name } });
    if (users.length === 0) {
      throw new AppError(404, "User not found");
    }

    sendResponse(res, 200, true, users , null, "Found user success");
  } catch (err) {
    next(err);
  }
};

const getUserTasks = async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);

      // Find all tasks assigned to the user
      const tasks = await Task.find({ assignedTo: userId }).select('_id');

      // Extract task IDs from the tasks
      const taskIds = tasks.map(task => task._id);

      sendResponse(res, 200, true, { userId: user._id, name: user.name, role: user.role, taskIds }, null, "User Tasks Retrieved Successfully");
      } catch (err) {
        next(err);
      }
};

module.exports = {
  createUser,
  getUsers,
  searchEmployeeByName,
  getUserTasks,
};
