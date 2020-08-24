const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jsonwebtoken = require('jsonwebtoken');

// New user registration
exports.signupUser = async (req, res) => {

    // Checking errors from users.routes.js
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring
    const {name, email, password} = req.body;

    try {
        let newUser = await User.findOne({email: email});
        if(newUser){
            return res.status(400).json({ msg: 'The email already exist'});
        }

        //create the new user
        newUser = new User(req.body);

        // Hash password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password,salt);

        // save user
        await newUser.save();

        // Create and sign Jsonwebtoken
        const payload = {
            newUser: {
                id: newUser.id
            }
        };


        jsonwebtoken.sign(payload, process.env.SECRET, {
            expiresIn: 360000
        }, (error, token) => {
            if(error) throw error;

            // Message, token information
            res.json({ token: token })
        }
        );

        //res.json({ msg: 'User created successfully'});
    } catch (error) {
       // console.log(error);
        res.status(400).send('There was an error')
    }
    
};

