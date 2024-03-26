const Task = require('../models/Task');
const User = require('../models/User');
const { AppError, sendResponse } = require('../helpers/utils');
const { taskValidation, updateTaskValidation, softDeleteTaskValidation, browseTaskValidation } = require('./validationSchema');

const createTask = async (req, res, next) => {
  try {
		const info = req.body;

		const validationResult = taskValidation.validate(info);
    if (validationResult.error) {
        throw new AppError(400, "Bad Request", validationResult.error.message);
    }

		const created= await Task.create(info);
		sendResponse(res,200,true,created,null,"Create Task Success");
	} catch (err) {
		next(err);
	}
};

const browseTasks = async (req, res, next) => {
  try {
    const validationResult = browseTaskValidation.validate(req.query);
    if (validationResult.error) {
        throw new AppError(400, "Bad Request", validationResult.error.message);
    }

    const query = { isDeleted: false, ...req.query };

    
    const { sort, order } = query;
    console.log("Sort:", sort)
    console.log("Order:", order)

    const sortOption = {
      [sort]: order,
  }

    const tasks = await Task.find(query).sort(sortOption);
    sendResponse(res, 200, true, { tasks }, null, "Browse Tasks successful");
  } catch (err) {
    next(err);
  }
};

const getTaskById = async (req, res, next) => {
  try{
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      throw new AppError(400, "Bad Request", "Task not found");
    }
    sendResponse(res, 200, true, { task }, null, "Get Task by Id successful");
  } catch (err) {
    next(err);
  }
};

const assignTaskToUser = async (req, res, next) => {
  try{
    const { userId } = req.body;
    const taskId = req.params.taskId;

    let task = await Task.findById(taskId);
    
    if (!task) {
      throw new AppError(404, "Not Found", "Task not found");
    }

    if(!userId) {
      task = await Task.findByIdAndUpdate(taskId, { assignedTo: null }, { new: true }).populate('assignedTo');
    } else {
      task = await Task.findByIdAndUpdate(taskId, { assignedTo: userId }, { new: true }).populate('assignedTo');
    }

    await User.findByIdAndUpdate(userId, {$push: {tasks: taskId}}, { new: true });

    sendResponse(res, 200, true, { task }, null, "Assign Task to User Success");
  } catch (err) {
    next(err);
  }
};

const updateTaskStatus = async (req, res, next) => {
  const { status } = req.body;

  try{
    const validationResult = updateTaskValidation.validate({ status });
    if (validationResult.error) {
      throw new AppError(400, "Bad Request", validationResult.error.message);
    }

    const task = await Task.findById(req.params.taskId);
    if (!task) {
      throw new AppError(404, "Not Found", "Task not found");
    }

    if (task.status === 'done' && status !== 'archive') {
      throw new AppError(400, "Bad Request", "Task status can only be changed to 'archive' once it is 'done'");
    }

    if (task.status === status) {
      throw new AppError(400, "Bad Request", "Nothing has changed");
    }

    task.status = status;
  
    await task.save();

    sendResponse(res, 200, true, { task }, null, "Update Task Status Success");

  } catch (err) {
    next(err);
  }
};

const softDeleteTask = async (req, res, next) => {
  try {
    const validationResult = softDeleteTaskValidation.validate(req.params);
    if (validationResult.error) {
      throw new AppError(400, "Bad Request", validationResult.error.message);
    }

    const task = await Task.findByIdAndUpdate(req.params.taskId, { isDeleted: true }, { new: true });
    if (!task) {
      throw new AppError(404, "Not Found", "Task not found");
    }
  
    sendResponse(res, 200, true, null, "Soft Delete Task Success");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTask,
  browseTasks,
  getTaskById,
  assignTaskToUser,
  updateTaskStatus,
  softDeleteTask,
};

