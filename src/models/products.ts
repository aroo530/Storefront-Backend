import client from '../database';
//I used get instead of index and show because this way is more clear

export type Product = {
    id?: number;
    name: string;
    stock: number;
    price: number;
    category?: string;
};

export class ProductOperations {
    //we get the product based on the name
    public async getProduct(name: string): Promise<Product> {
        try {
            const connection = await client.connect();
            const result = await client.query(
                'SELECT * FROM products WHERE name = $1',
                [name]
            );
            connection.release();
            return result.rows[0];
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }
    public async getProductsByCategory(category: string): Promise<Product[]> {
        try {
            const connection = await client.connect();
            const result = await client.query(
                'SELECT * FROM products WHERE category = $1',
                [category]
            );
            connection.release();
            return result.rows;
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }

    public async getAllProducts(): Promise<Product[]> {
        try {
            const connection = await client.connect();
            const result = await client.query('SELECT * FROM products');
            connection.release();
            return result.rows;
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }

    public async createProduct(tempProduct: Product): Promise<Product> {
        try {
            const connection = await client.connect();
            const result = await client.query(
                'INSERT INTO products (name,stock, price, category) VALUES ($1, $2, $3, $4) RETURNING *',
                [
                    tempProduct.name,
                    tempProduct.stock,
                    tempProduct.price,
                    tempProduct.category,
                ]
            );
            connection.release();
            return result.rows[0];
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }
    //we can update anything in the product except the id and the name
    public async updateProduct(tempProduct: Product): Promise<Product> {
        try {
            const connection = await client.connect();
            const result = await client.query(
                'UPDATE products SET stock = $2, price = $3, category = $4 WHERE name = $1 RETURNING *',
                [
                    tempProduct.name,
                    tempProduct.stock,
                    tempProduct.price,
                    tempProduct.category,
                ]
            );
            connection.release();
            return result.rows[0];
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }

    public async deleteProduct(name: string): Promise<Product> {
        try {
            const connection = await client.connect();
            const result = await client.query(
                'DELETE FROM products WHERE name = $1 RETURNING *',
                [name]
            );
            connection.release();
            return result.rows[0];
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }
}
