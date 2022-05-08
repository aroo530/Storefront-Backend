import client from '../database';
import dotenv from 'dotenv';
dotenv.config();

export type User = {
    id?: string;
    first_name: string;
    last_name: string;
    password: string;
};

export class UserOperations {
    public async getIdByFirstName(first_name: string): Promise<User> {
        try {
            const connection = await client.connect();
            const result = await connection.query(
                'SELECT id FROM users WHERE first_name = $1',
                [first_name]
            );
            await connection.release();
            return result.rows[0];
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }
    public async getUser(first_name: string): Promise<User> {
        try {
            const connection = await client.connect();
            const result = await connection.query(
                'SELECT * FROM users WHERE first_name = $1',
                [first_name]
            );
            await connection.release();
            return result.rows[0];
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }

    public async getUsers(): Promise<User[]> {
        try {
            const connection = await client.connect();
            const result = await connection.query('SELECT * FROM users');
            await connection.release();
            return result.rows;
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }

    public async createUser(newUser: User): Promise<User> {
        try {
            const connection = await client.connect();
            const result = await connection.query(
                'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *',
                [newUser.first_name, newUser.last_name, newUser.password]
            );
            // console.log(result.rows[0]);
            await connection.release();
            return result.rows[0];
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }

    public async updateUser(
        password: string,
        first_name: string
    ): Promise<User> {
        const connection = await client.connect();
        const result = await connection.query(
            'UPDATE users SET password = $1 WHERE first_name = $2 RETURNING *',
            [password, first_name]
        );
        await connection.release();
        return result.rows[0];
    }

    public async deleteUser(first_name: string): Promise<User> {
        const connection = await client.connect();
        try {
            const result = await connection.query(
                'DELETE FROM users WHERE first_name = $1 RETURNING *',
                [first_name]
            );
            await connection.release();

            return result.rows[0];
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }
}
