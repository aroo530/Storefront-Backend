import supertest from 'supertest';
import { orderOperationsRouts } from '../../handlers/orderHandler';
import { userOperaionsRoutes } from '../../handlers/userHandler';
import { productOperationsRouts } from '../../handlers/productHandler';
import { Product } from '../../models/products';
import { Order } from '../../models/orders';
import { User } from '../../models/users';
import app from '../../server';

describe('testing all handlers', () => {
    const tempProd: Product = {
        name: 'iphone',
        stock: 10,
        price: 999.99,
        category: 'electronics',
    };
    const updateProd: Product = {
        name: 'iphone',
        stock: 20,
        price: 1999.99,
        category: 'electronics',
    };
    const tempOrder: Order = {
        user_id: 'John',
        status: 'active',
    };
    const updateOrder: Order = {
        user_id: 'John',
        status: 'active',
    };
    const tempUser: User = {
        first_name: 'John',
        last_name: 'Doe',
        password: 'UHoperations',
    };
    const updateUser: User = {
        first_name: 'John',
        last_name: 'Doe',
        password: '123456',
    };
    let token: string = 'Bearer ';

    orderOperationsRouts(app);
    userOperaionsRoutes(app);
    productOperationsRouts(app);
    const request = supertest(app);

    describe('testing POST endpoints', () => {
        it('should create a new user', async () => {
            const response = await request
                .post('/users/signup')
                .send(tempUser)
                .expect(201);
            token += response.body;
            // console.log(token);
        });
        it('should login a user', async () => {
            await request
                .post('/users/login')
                .send({
                    first_name: 'John',
                    password: 'UHoperations',
                })
                .expect(200);
        });
        it('should create a new product', async () => {
            const response = await request
                .post('/products')
                .set('Authorization', token)
                .send(tempProd)
                .expect(200);
            expect(response.body.name).toEqual(tempProd.name);
        });
        it('should create a new order', async () => {
            const response = await request
                .post('/orders')
                .set('Authorization', token)
                .send(tempOrder)
                .expect(200);
            expect(response.body.status).toEqual(tempOrder.status);
        });
        // it("should create a new Cart", async () => {});
    });
    describe('testing GET endpoints', () => {
        it('should get all products', async () => {
            const response = await request.get('/products').expect(200);
        });
        it('should get a product', async () => {
            const response = await request.get('/products/iphone').expect(200);
            expect(response.body.name).toEqual('iphone');
        });
        it('should get all users', async () => {
            const response = await request.get('/users').expect(200);
        });
        it('should get a user', async () => {
            const response = await request.get('/users/John').expect(200);
            expect(response.body.first_name).toEqual('John');
        });
        it('should get all orders', async () => {
            const response = await request.get('/orders').expect(200);
        });
        it('should get an order', async () => {
            const response = await request.get('/orders/John').expect(200);
        });
        // it("should get a cart", async () => {
        //   const response = await request.get("/carts/2").expect(200);
        //   expect(response.body.id).toEqual("2");
        // });
    });
    describe('testing PUT endpoints', () => {
        it('should update a product', async () => {
            const response = await request
                .put('/products')
                .set('Authorization', token)
                .send(updateProd)
                .expect(200);
            expect(response.body.name).toEqual(updateProd.name);
        });
        it('should update a user', async () => {
            const response = await request
                .put('/users')
                .set('Authorization', token)
                .send({
                    password: updateUser.password,
                    first_name: tempUser.first_name,
                })
                .expect(200);
            expect(response.body.first_name).toEqual(updateUser.first_name);
        });
        it('should update an order', async () => {
            const response = await request
                .put('/orders')
                .set('Authorization', token)
                .send(updateOrder)
                .expect(200);
            expect(response.body.status).toEqual(updateOrder.status);
        });
        // it("should update a cart", async () => {
        //   const response = await request
        //     .put("/carts/2")
        //     .set("Authorization", token)
        //     .send(updateCart)
        //     .expect(200);
        //   expect(response.body.id).toEqual(updateCart.id);
        // });
    });
    describe('testing DELETE endpoints', () => {
        it('should delete a product', async () => {
            const response = await request
                .delete('/products/2')
                .set('Authorization', token)
                .expect(200);
            expect(response.body).toEqual('Product deleted');
        });
        it('should delete a user', async () => {
            const response = await request
                .delete('/users/2')
                .set('Authorization', token)
                .expect(200);
            expect(response.body).toEqual('User deleted');
        });
        it('should delete an order', async () => {
            const response = await request
                .delete('/orders/John')
                .set('Authorization', token)
                .expect(200);
            expect(response.body).toEqual('Order deleted');
        });
        // it("should delete a cart", async () => {
        //   const response = await request
        //     .delete("/carts/2")
        //     .set("Authorization", token)
        //     .expect(200);
        //   expect(response.body).toEqual("Cart deleted");
        // });
    });
});
