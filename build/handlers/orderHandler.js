"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderOperationsRouts = void 0;
const orders_1 = require("../models/orders");
const users_1 = require("../models/users");
const verifyToken_1 = require("../middleware/verifyToken");
const products_1 = require("../models/products");
const operations = new orders_1.OrderOperations();
const userOperations = new users_1.UserOperations();
const productOperations = new products_1.ProductOperations();
const getOrder = async (req, res) => {
    try {
        const user = await userOperations.getIdByFirstName(req.params.user_id);
        const order = await operations.getOrder(user.id);
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
const getOrders = async (req, res) => {
    try {
        const orders = await operations.getAllOrders();
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
const createOrder = async (req, res) => {
    try {
        const getId = await userOperations.getIdByFirstName(req.body.user_id);
        if (getId) {
            let order = req.body;
            order.user_id = getId.id;
            const newOrder = await operations.createOrder(order);
            res.json(newOrder);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
const updateOrderStatus = async (req, res) => {
    try {
        const getId = await userOperations.getIdByFirstName(req.body.user_id);
        let order = req.body;
        order.user_id = getId.id;
        const updatedOrder = await operations.updateOrderStatus(order);
        res.json(updatedOrder);
    }
    catch (error) {
        res.status(404).json({ message: 'not found' });
    }
};
const deleteOrder = async (req, res) => {
    try {
        const getId = await userOperations.getIdByFirstName(req.params.user_id);
        await operations.deleteOrder(getId.id);
        res.json('Order deleted');
    }
    catch (error) {
        res.status(404).json({ message: 'not found' });
    }
};
const addProductToOrder = async (req, res) => {
    //we will get the order id from the user id
    try {
        const user = await userOperations.getIdByFirstName(req.params.user_id);
        const order = await operations.getOrder(user.id);
        const product = await productOperations.getProduct(req.body.product_name);
        const cart = await operations.addProductToOrder(order.id, product.id, req.body.quantity);
        res.json(cart);
    }
    catch (error) {
        res.status(404).json({ message: 'not found' });
    }
};
const checkStatus = async (req, res, next) => {
    try {
        const user = await userOperations.getIdByFirstName(req.body.user_id);
        const order = await operations.getOrder(user.id);
        if (order.status === 'active') {
            next();
        }
        else {
            res.status(400).send('Complete orders cannot be updated');
        }
    }
    catch (error) {
        res.status(404).send('Order not found');
    }
};
const orderOperationsRouts = (app) => {
    app.get('/orders/:user_id', verifyToken_1.verifyAuthToken, getOrder);
    app.get('/orders', verifyToken_1.verifyAuthToken, getOrders);
    app.post('/orders', verifyToken_1.verifyAuthToken, createOrder);
    app.post('/orders/:user_id/products', verifyToken_1.verifyAuthToken, addProductToOrder);
    app.put('/orders', verifyToken_1.verifyAuthToken, checkStatus, updateOrderStatus);
    app.delete('/orders/:user_id', verifyToken_1.verifyAuthToken, deleteOrder);
};
exports.orderOperationsRouts = orderOperationsRouts;
