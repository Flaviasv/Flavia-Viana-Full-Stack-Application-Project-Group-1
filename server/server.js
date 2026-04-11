const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios');

// Load environment variables from .env file
require('dotenv').config();

// Middleware
app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB Connection
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// GET /products - Get all products from this store
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ productId: 1 });
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// POST /products - Add a new product
app.post('/products', async (req, res) => {
    try {
        const { storeId, storeName, productId, productName, price } = req.body;

        // Check if all required fields are provided
        if (!storeId || !storeName || !productId || !productName || !price) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create new product
        const newProduct = new Product({
            storeId,
            storeName,
            productId,
            productName,
            price
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// Basic route to test if server is working
// app.get('/', (req, res) => {
// res.send('Server is running!');
// });

// GET /products/:productId - Get a single product by productId
app.get('/products/:productId', async (req, res) => {
    try {
        const product = await Product.findOne({ productId: req.params.productId });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// PUT /products/:productId - Update a product by productId
app.put('/products/:productId', async (req, res) => {
    try {
        const { storeId, storeName, productName, price } = req.body;

        // Find the product by productId
        const product = await Product.findOne({ productId: req.params.productId });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update only the fields that are provided
        if (storeId) product.storeId = storeId;
        if (storeName) product.storeName = storeName;
        if (productName) product.productName = productName;
        if (price) product.price = price;

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// DELETE /products/:productId - Delete a product by productId
app.delete('/products/:productId', async (req, res) => {
    try {
        // Find and delete the product by productId
        const deletedProduct = await Product.findOneAndDelete({ productId: req.params.productId });

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

// GET /all-stores/products - Get products from all team stores (Aggregator)
app.get('/all-stores/products', async (req, res) => {
    try {
        // List of teammates' API endpoints
        const teammateUrls = [
            'https://hassan-store-api.onrender.com/products',
        ];

        // Your own products
        const myProducts = await Product.find();

        // Fetch products from all teammates
        const teammatePromises = teammateUrls.map(async (url) => {
            try {
                const response = await axios.get(url);
                return response.data;
            } catch (error) {
                console.error(`Error fetching from ${url}:`, error.message);
                return []; // Return empty array if teammate's API fails
            }
        });

        const teammateProducts = await Promise.all(teammatePromises);

        // Combine all products: your products + all teammates' products
        const allProducts = [
            ...myProducts,
            ...teammateProducts.flat()
        ];

        res.status(200).json({
            totalProducts: allProducts.length,
            products: allProducts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products from all stores' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});