const mongoose = require('mongoose');
require('dotenv').config({path: '.env'});


const connectDB = async () =>{

    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Database is connected');
    } catch (error) {
        console.log('There was an error');
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;
