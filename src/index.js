const express = require('express');
const connectDB = require('./config/db');

// Initializations
const app = express();

// Connect to database
connectDB();

// enabling express to read json, express.json 
app.use(express.json({extended: true}));

// Settings - Port
const PORT = process.env.PORT || 4000;

/* Small example
// Router - Main page
app.get('/', (req, res) => {
    res.send('index Hello world');
});
*/

// Import Routes
app.use('/api/users', require('./routes/users.routes'));


// Starting server / app
app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`);
});
