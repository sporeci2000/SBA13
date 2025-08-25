const mongoose = require('mongoose');

// Read the connection string from environment variables
const uri = process.env.MONGODB_URI;

async function connectDatabase() {
    try {
        // Attempt to connect using mongoose
        await mongoose.connect(uri);

        // If no error connection succeeded
        console.log('Connected successfully!');
    } catch (err) {
        // If connection fails log the error
        console.error(' Error!', err.message);
    }
}

// Immediately call the function once this file is required
connectDatabase();

// Export mongoose so other files can use the same connection
module.exports = mongoose;