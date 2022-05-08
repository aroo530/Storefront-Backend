import client from '../database';
import { Cart } from './carts';
//I used get instead of index and show because this way is more clear
export type Order = {
    id?: number;
    user_id: string;
    status: string;
};
export class OrderOperations {
    //this is the cart table
    public async addProductToOrder(
        order_id: number,
        productId: number,
        quantity: number
    ): Promise<Cart> {
        try {
            const connection = await client.connect();
            const result = await client.query(
                'INSERT INTO carts (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
                [order_id, productId, quantity]
            );
            connection.release();
            return result.rows[0];
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }
    //we get the order based on the user id
    public async getOrder(user_id: string): Promise<Order> {
        try {
            const connection = await client.connect();
            const result = await client.query(
                'SELECT * FROM orders WHERE user_id = $1',
                [user_id]
            );
            connection.release();
            return result.rows[0];
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }
    //we get all the orders no arguments are needed
    public async getAllOrders(): Promise<Order[]> {
        try {
            const connection = await client.connect();
            const result = await client.query(
                'SELECT user_id, status FROM orders'
            );
            connection.release();
            return result.rows;
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }
    // creating an order we pass the order as an object and insert it
    public async createOrder(tempOrder: Order): Promise<Order> {
        try {
            const connection = await client.connect();
            const result = await client.query(
                'INSERT INTO orders (user_id,status) VALUES ($1, $2) RETURNING *',
                [tempOrder.user_id, tempOrder.status]
            );
            connection.release();
            return result.rows[0];
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }
    //we only update the status of the order
    public async updateOrderStatus(tempOrder: Order): Promise<Order> {
        try {
            const connection = await client.connect();
            const result = await client.query(
                'UPDATE orders SET user_id = $1, status = $2 WHERE user_id = $1 RETURNING *',
                [tempOrder.user_id, tempOrder.status]
            );
            connection.release();
            return result.rows[0];
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }
    //we delete the order based on the user id
    public async deleteOrder(user_id: string): Promise<Order> {
        try {
            const connection = await client.connect();
            const result = await client.query(
                'DELETE FROM orders WHERE user_id = $1 RETURNING user_id, status',
                [user_id]
            );
            connection.release();
            return result.rows[0];
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }
}
