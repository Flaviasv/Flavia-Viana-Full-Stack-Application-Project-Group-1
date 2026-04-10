const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});

// Create and export the Product model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;