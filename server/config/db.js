const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MY_MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB...');
    }
    catch(error) {
        console.log(err.message);

        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;