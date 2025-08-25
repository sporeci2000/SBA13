// Load environment variables
require('dotenv').config();

// Import express
const express = require('express');

// Import the DB connection
require('./config/connection');

// Import the product routes
const productRoutes = require('./routes/productRoutes');

// Initialize express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount product routes at /api/products
app.use('/api/products', productRoutes);

// Define the port 
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});