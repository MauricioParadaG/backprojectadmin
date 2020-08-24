const {Router} = require('express');
const router = Router();
const authController = require('../controllers/auth.controller');
const {check} = require('express-validator');
const auth = require('../middleware/auth.middleware');

// api/auth
// Login 
router.post('/', 
  /*  [
        check('email', 'Please write a valid email').isEmail(),
        check('password', 'Password must be minimun 6 words').isLength({min: 6})
    ],
  */
    authController.loginUser
);

// get the authenticated user with the token
router.get('/', 
    auth, 
    authController.authenticatedUser

);



module.exports = router;