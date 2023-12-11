const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
        });
        console.log(`Connect successfully to mongoDB`);
    } catch (error) {
        console.log('Connect failure');
    }
}

module.exports = { connectDB };