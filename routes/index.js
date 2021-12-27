const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const authenticated = require('../middleware/authenticated');
const isUserPresent = require('../middleware/isUsePresent');

router.all('*/api/*', authenticated, isUserPresent)
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);;

module.exports = router;
