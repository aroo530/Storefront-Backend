"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOperations = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserOperations {
    async getIdByFirstName(first_name) {
        try {
            const connection = await database_1.default.connect();
            const result = await connection.query('SELECT id FROM users WHERE first_name = $1', [first_name]);
            await connection.release();
            return result.rows[0];
        }
        catch (error) {
            // console.log(error);
            throw error;
        }
    }
    async getUser(first_name) {
        try {
            const connection = await database_1.default.connect();
            const result = await connection.query('SELECT * FROM users WHERE first_name = $1', [first_name]);
            await connection.release();
            return result.rows[0];
        }
        catch (error) {
            // console.log(error);
            throw error;
        }
    }
    async getUsers() {
        try {
            const connection = await database_1.default.connect();
            const result = await connection.query('SELECT * FROM users');
            await connection.release();
            return result.rows;
        }
        catch (error) {
            // console.log(error);
            throw error;
        }
    }
    async createUser(newUser) {
        try {
            const connection = await database_1.default.connect();
            const result = await connection.query('INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *', [newUser.first_name, newUser.last_name, newUser.password]);
            // console.log(result.rows[0]);
            await connection.release();
            return result.rows[0];
        }
        catch (error) {
            // console.log(error);
            throw error;
        }
    }
    async updateUser(password, first_name) {
        const connection = await database_1.default.connect();
        const result = await connection.query('UPDATE users SET password = $1 WHERE first_name = $2 RETURNING *', [password, first_name]);
        await connection.release();
        return result.rows[0];
    }
    async deleteUser(first_name) {
        const connection = await database_1.default.connect();
        try {
            const result = await connection.query('DELETE FROM users WHERE first_name = $1 RETURNING *', [first_name]);
            await connection.release();
            return result.rows[0];
        }
        catch (error) {
            // console.log(error);
            throw error;
        }
    }
}
exports.UserOperations = UserOperations;
