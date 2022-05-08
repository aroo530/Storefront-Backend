"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const getCart = async (order_id) => {
    try {
        const connection = await database_1.default.connect();
        const cart = await database_1.default.query(`SELECT * FROM carts WHERE order_id = $1`, [
            order_id,
        ]);
        await connection.release();
        return cart.rows[0];
    }
    catch (error) {
        throw error;
    }
};
