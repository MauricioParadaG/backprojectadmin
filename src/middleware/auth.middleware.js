const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Reading token from header
    const token = req.header('x-auth-token');

    // Checking if there is no token
    if(!token) {
        return res.status(401).json({msg: 'There is no token, invalid access'}) 
    }

    // Validating token

    try {
        const verifiedToken = jwt.verify(token, process.env.SECRET);
        req.newUser = verifiedToken.newUser;
        next();
    } catch (error) {
        res.status(401).json({msg: 'This token is not valid'});
    }
}