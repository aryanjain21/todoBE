const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const TaskController = require('../controllers/task');
const authenticated = require('../middleware/authenticated');
const isUserPresent = require('../middleware/isUsePresent');

router.all('*/api/*', authenticated, isUserPresent)
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/api/add-task', TaskController.addTask);
router.get('/api/get-task-list', TaskController.getTaskList);
router.post('/api/delete-task', TaskController.deleteTask);

module.exports = router;
