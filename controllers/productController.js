const Product = require('../models/Product');

// Create a new product
const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get one product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found!' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) return res.status(404).json({ error: 'Product not found!' });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ error: 'Product not found!' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all products
const getAllProducts = (req, res) => {
    const { category, minPrice, maxPrice, sortBy } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Build filter
    const filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Sorting
    let sortOption = {};
    if (sortBy === 'price_asc') sortOption.price = 1;
    if (sortBy === 'price_desc') sortOption.price = -1;

    Product.find(filter)
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit)
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
};


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};