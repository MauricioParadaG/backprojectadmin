const {Router} = require('express');
const router = Router();
const usersController = require('../controllers/users.controller');
const {check} = require('express-validator');

// Create a user api/users
router.post('/', 
    [
        check('name', 'Name is a require field').not().isEmpty(),
        check('email', 'Please write a valid email').isEmail(),
        check('password', 'Password must be minimun 6 words').isLength({min: 6})
    ],
usersController.signupUser
);


module.exports = router;