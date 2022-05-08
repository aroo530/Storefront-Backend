"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const orderHandler_1 = require("../../handlers/orderHandler");
const userHandler_1 = require("../../handlers/userHandler");
const productHandler_1 = require("../../handlers/productHandler");
const server_1 = __importDefault(require("../../server"));
describe('testing all handlers', () => {
    const tempProd = {
        name: 'iphone',
        stock: 10,
        price: 999.99,
        category: 'electronics',
    };
    const updateProd = {
        name: 'iphone',
        stock: 20,
        price: 1999.99,
        category: 'electronics',
    };
    const tempOrder = {
        user_id: 'John',
        status: 'active',
    };
    const updateOrder = {
        user_id: 'John',
        status: 'active',
    };
    const tempUser = {
        first_name: 'John',
        last_name: 'Doe',
        password: 'UHoperations',
    };
    const updateUser = {
        first_name: 'John',
        last_name: 'Doe',
        password: '123456',
    };
    let token = 'Bearer ';
    (0, orderHandler_1.orderOperationsRouts)(server_1.default);
    (0, userHandler_1.userOperaionsRoutes)(server_1.default);
    (0, productHandler_1.productOperationsRouts)(server_1.default);
    const request = (0, supertest_1.default)(server_1.default);
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
            const response = await request
                .get('/products')
                .set('Authorization', token)
                .expect(200);
        });
        it('should get a product', async () => {
            const response = await request
                .get('/products/iphone')
                .set('Authorization', token)
                .expect(200);
            expect(response.body.name).toEqual('iphone');
        });
        it('should get all users', async () => {
            const response = await request
                .get('/users')
                .set('Authorization', token)
                .expect(200);
        });
        it('should get a user', async () => {
            const response = await request
                .get('/users/John')
                .set('Authorization', token)
                .expect(200);
            expect(response.body.first_name).toEqual('John');
        });
        it('should get all orders', async () => {
            const response = await request
                .get('/orders')
                .set('Authorization', token)
                .expect(200);
        });
        it('should get an order', async () => {
            const response = await request
                .get('/orders/John')
                .set('Authorization', token)
                .expect(200);
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
