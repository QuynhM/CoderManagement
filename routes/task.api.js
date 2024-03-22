const express = require('express');
const {createTask, browseTasks, getTaskById, updateTaskStatus, assignTaskToUser, softDeleteTask} = require('../controllers/task.controller');
const router = express.Router();

// CREATE
router.post('/', createTask);

// BROWSE TASKS
router.get('/', browseTasks);

// GET TASKS BY ID
router.get('/:taskId', getTaskById);

// ASSIGN TASK TO USER OR UNASSIGN THEM
router.put('/:taskId/assign', assignTaskToUser);

// UPDATE TASK STATUS
router.put('/:taskId', updateTaskStatus);

// SOFT DELETE TASK
router.put('/:taskId/delete', softDeleteTask);

module.exports = router;
