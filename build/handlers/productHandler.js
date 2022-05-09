"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productOperationsRouts = void 0;
const products_1 = require("../models/products");
const verifyToken_1 = require("../middleware/verifyToken");
const operations = new products_1.ProductOperations();
const getProduct = async (req, res) => {
    try {
        const name = req.params.name;
        const product = await operations.getProduct(name);
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const products = await operations.getProductsByCategory(category);
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
const getProducts = async (_req, res) => {
    try {
        const products = await operations.getAllProducts();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
const createProduct = async (req, res) => {
    try {
        const tempProduct = req.body;
        const newProduct = await operations.createProduct(tempProduct);
        res.json(newProduct);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
const updateProduct = async (_req, res) => {
    try {
        const tempProduct = _req.body;
        const updatedProduct = await operations.updateProduct(tempProduct);
        res.json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const name = req.params.name;
        const product = await operations.deleteProduct(name);
        res.json('Product deleted');
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
const productOperationsRouts = (app) => {
    app.get('/products/:name', getProduct);
    app.get('/products', getProducts);
    app.get('/products/category/:category', getProductsByCategory);
    app.post('/products', verifyToken_1.verifyAuthToken, createProduct);
    app.put('/products', verifyToken_1.verifyAuthToken, updateProduct);
    app.delete('/products/:name', verifyToken_1.verifyAuthToken, deleteProduct);
};
exports.productOperationsRouts = productOperationsRouts;
