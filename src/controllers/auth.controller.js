const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jsonwebtoken = require('jsonwebtoken');

// User login
exports.loginUser = async (req, res) => {

    // Checking errors from users.routes.js
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring
    const { email, password} = req.body;

    try {
        let user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({ msg: 'This user does not exist or the password is incorrect'});
        }

        // Compare passwords
        const passCorrect = await bcrypt.compare(password, user.password);
        if(!passCorrect){
            return res.status(400).json({ msg: 'This user does not exist or the Password!! is incorrect'});
        };

        // Create and sign Jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        };


        jsonwebtoken.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            // Message, token number
            res.json({ token: token })
        }
        );

        //res.json({ msg: 'User created successfully'});
    } catch (error) {
        console.log(error);
        res.status(400).send('There was a login error');
    }
    
};


// Controller getting the authenticated user

exports.authenticatedUser = async (req, res) => {
    try {
        const user = await User.findById(req.newUser.id);
        res.json({user});

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'There was an error'});
    }

}

