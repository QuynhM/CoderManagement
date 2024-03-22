const express = require('express');
const router = express.Router();
const {createUser, getUsers, searchEmployeeByName, getUserTasks} = require('../controllers/user.controller');

// CREATE
router.post('/', createUser);

// READ
router.get('/', getUsers);

// SEARCH EMPLOYEE BY NAME
router.get('/search', searchEmployeeByName);

// SEARCH USER'S TASKS
router.get('/:userId/tasks', getUserTasks);

module.exports = router;
 