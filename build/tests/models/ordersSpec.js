"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
const users_1 = require("../../models/users");
describe('OrderOperations', () => {
    const operations = new orders_1.OrderOperations();
    const userOperations = new users_1.UserOperations();
    const tempUser = {
        first_name: 'Ahmed',
        last_name: 'mostafa',
        password: 'ORDERoperations',
    };
    userOperations.createUser(tempUser);
    const tempOrder = {
        user_id: '2',
        status: 'active',
    };
    const updateOrder = {
        user_id: '2',
        status: 'completed',
    };
    it('should create a new Order', async () => {
        const newOrder = await operations.createOrder(tempOrder);
        expect(newOrder.user_id).toBe(tempOrder.user_id);
        expect(newOrder.status).toBe(tempOrder.status);
    });
    it('should get Order', async () => {
        const Order = await operations.getOrder('2');
        expect(Order.status).toEqual('active');
    });
    it('should get all Orders', async () => {
        expect((await operations.getAllOrders()).length).toEqual(1);
    });
    it('should update Order', async () => {
        const order = await operations.updateOrderStatus(updateOrder);
        expect(order.status).toEqual('completed');
    });
    it('should delete Order', async () => {
        const order = await operations.deleteOrder('2');
        expect(order.user_id).toEqual(updateOrder.user_id);
        expect(order.status).toEqual(updateOrder.status);
        userOperations.deleteUser('Ahmed');
    });
});
