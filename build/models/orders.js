"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderOperations = void 0;
const database_1 = __importDefault(require("../database"));
class OrderOperations {
    //this is the cart table
    async addProductToOrder(order_id, productId, quantity) {
        try {
            const connection = await database_1.default.connect();
            const result = await database_1.default.query('INSERT INTO carts (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [order_id, productId, quantity]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            // console.log(error);
            throw error;
        }
    }
    //we get the order based on the user id
    async getOrder(user_id) {
        try {
            const connection = await database_1.default.connect();
            const result = await database_1.default.query('SELECT * FROM orders WHERE user_id = $1', [user_id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            // console.log(error);
            throw error;
        }
    }
    //we get all the orders no arguments are needed
    async getAllOrders() {
        try {
            const connection = await database_1.default.connect();
            const result = await database_1.default.query('SELECT user_id, status FROM orders');
            connection.release();
            return result.rows;
        }
        catch (error) {
            // console.log(error);
            throw error;
        }
    }
    // creating an order we pass the order as an object and insert it
    async createOrder(tempOrder) {
        try {
            const connection = await database_1.default.connect();
            const result = await database_1.default.query('INSERT INTO orders (user_id,status) VALUES ($1, $2) RETURNING *', [tempOrder.user_id, tempOrder.status]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            // console.log(error);
            throw error;
        }
    }
    //we only update the status of the order
    async updateOrderStatus(tempOrder) {
        try {
            const connection = await database_1.default.connect();
            const result = await database_1.default.query('UPDATE orders SET user_id = $1, status = $2 WHERE user_id = $1 RETURNING *', [tempOrder.user_id, tempOrder.status]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            // console.log(error);
            throw error;
        }
    }
    //we delete the order based on the user id
    async deleteOrder(user_id) {
        try {
            const connection = await database_1.default.connect();
            const result = await database_1.default.query('DELETE FROM orders WHERE user_id = $1 RETURNING user_id, status', [user_id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            // console.log(error);
            throw error;
        }
    }
}
exports.OrderOperations = OrderOperations;
