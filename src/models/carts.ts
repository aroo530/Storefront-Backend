import client from '../database';

export type Cart = {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
};

const getCart = async (order_id: string): Promise<Cart> => {
    try {
        const connection = await client.connect();
        const cart = await client.query(
            `SELECT * FROM carts WHERE order_id = $1`,
            [order_id]
        );
        await connection.release();
        return cart.rows[0];
    } catch (error) {
        throw error;
    }
};
