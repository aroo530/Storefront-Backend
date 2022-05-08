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
    const user = await userOperations.getIdByFirstName(req.params.user_id);
    const order = await operations.getOrder(user.id);
    res.json(order);
};
const getOrders = async (req, res) => {
    const orders = await operations.getAllOrders();
    res.json(orders);
};
const createOrder = async (req, res) => {
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
};
const updateOrderStatus = async (req, res) => {
    const getId = await userOperations.getIdByFirstName(req.body.user_id);
    let order = req.body;
    order.user_id = getId.id;
    const updatedOrder = await operations.updateOrderStatus(order);
    res.json(updatedOrder);
};
const deleteOrder = async (req, res) => {
    const getId = await userOperations.getIdByFirstName(req.params.user_id);
    await operations.deleteOrder(getId.id);
    res.json('Order deleted');
};
const addProductToOrder = async (req, res) => {
    //we will get the order id from the user id
    const user = await userOperations.getIdByFirstName(req.params.user_id);
    const order = await operations.getOrder(user.id);
    const product = await productOperations.getProduct(req.body.product_name);
    const updatedOrder = await operations.addProductToOrder(order.id, product.id, req.body.quantity);
    res.json(updatedOrder);
};
const checkStatus = async (req, res, next) => {
    const user = await userOperations.getIdByFirstName(req.body.user_id);
    const order = await operations.getOrder(user.id);
    if (order.status === 'active') {
        next();
    }
    else {
        res.status(400).send('Complete orders cannot be updated');
    }
};
const orderOperationsRouts = (app) => {
    app.get('/orders/:user_id', getOrder);
    app.get('/orders', getOrders);
    app.post('/orders', verifyToken_1.verifyAuthToken, createOrder);
    app.post('/orders/:user_id/products', verifyToken_1.verifyAuthToken, addProductToOrder);
    app.put('/orders', verifyToken_1.verifyAuthToken, checkStatus, updateOrderStatus);
    app.delete('/orders/:user_id', verifyToken_1.verifyAuthToken, deleteOrder);
};
exports.orderOperationsRouts = orderOperationsRouts;
