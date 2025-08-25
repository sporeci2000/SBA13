// Import the Schema and model constructors from mongoose
const { Schema, model } = require('mongoose');

// Define the shape of a Product document
const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required.'],
            trim: true, // removes spaces
        },

        description: {
            type: String,
            required: [true, 'Product description is required.'],
            trim: true,
        },

        price: {
            type: Number,
            required: [true, 'Product price is required.'],
            // custom validator ensures strictly greater than 0
            validate: {
                validator: (value) => value > 0,
                message: 'Price must be greater than 0.'
            },
        },

        category: {
            type: String,
            required: [true, 'Product category is required.'],
            trim: true,
        },

        inStock: {
            type: Boolean,
            default: true,
        },

        tags: {
            type: [String],
            default: [], // empty array if omitted
        },

        createdAt: {
            type: Date,
            default: Date.now,
            immutable: true, // prevent later edits
        },
    },
);

// Compile the schema into a Model 
module.exports = model('Product', productSchema);
