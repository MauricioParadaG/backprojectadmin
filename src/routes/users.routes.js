const {Router} = require('express');
const router = Router();
const usersController = require('../controllers/users.controller');

// Create a user api/users
router.post('/', 
usersController.signupUser
);


module.exports = router;