const User = require('../models/User');
const bcrypt = require('bcryptjs');

// New user registration
exports.signupUser = async (req, res) => {

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

        res.json({ msg: 'User created successfully'});
    } catch (error) {
        console.log(error);
        res.status(400).send('There was an error')
    }
    
};

