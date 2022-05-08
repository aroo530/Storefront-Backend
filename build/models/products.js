"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductOperations = void 0;
const database_1 = __importDefault(require("../database"));
class ProductOperations {
    //we get the product based on the name
    async getProduct(name) {
        try {
            const connection = await database_1.default.connect();
            const result = await database_1.default.query('SELECT * FROM products WHERE name = $1', [name]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            // console.log(error);
            throw error;
        }
    }
    async getProductsByCategory(category) {
        try {
            const connection = await database_1.default.connect();
            const result = await database_1.default.query('SELECT * FROM products WHERE category = $1', [category]);
            connection.release();
            return result.rows;
        }
        catch (error) {
            // console.log(error);
            throw error;
        }
    }
    async getAllProducts() {
        try {
            const connection = await database_1.default.connect();
            const result = await database_1.default.query('SELECT * FROM products');
            connection.release();
            return result.rows;
        }
        catch (error) {
            // console.log(error);
            throw error;
        }
    }
    async createProduct(tempProduct) {
        try {
            const connection = await database_1.default.connect();
            const result = await database_1.default.query('INSERT INTO products (name,stock, price, category) VALUES ($1, $2, $3, $4) RETURNING *', [
                tempProduct.name,
                tempProduct.stock,
                tempProduct.price,
                tempProduct.category,
            ]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            // console.log(error);
            throw error;
        }
    }
    //we can update anything in the product except the id and the name
    async updateProduct(tempProduct) {
        try {
            const connection = await database_1.default.connect();
            const result = await database_1.default.query('UPDATE products SET stock = $2, price = $3, category = $4 WHERE name = $1 RETURNING *', [
                tempProduct.name,
                tempProduct.stock,
                tempProduct.price,
                tempProduct.category,
            ]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            // console.log(error);
            throw error;
        }
    }
    async deleteProduct(name) {
        try {
            const connection = await database_1.default.connect();
            const result = await database_1.default.query('DELETE FROM products WHERE name = $1 RETURNING *', [name]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            // console.log(error);
            throw error;
        }
    }
}
exports.ProductOperations = ProductOperations;
