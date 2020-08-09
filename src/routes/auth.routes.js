const {Router} = require('express');
const router = Router();
const authController = require('../controllers/auth.controller');
const {check} = require('express-validator');

// Create a user api/auth
router.post('/', 
    [
        check('email', 'Please write a valid email').isEmail(),
        check('password', 'Password must be minimun 6 words').isLength({min: 6})
    ],
    authController.loginUser
);


module.exports = router;