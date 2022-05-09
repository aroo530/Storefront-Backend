import { Order, OrderOperations } from '../../models/orders';
import { User, UserOperations } from '../../models/users';

describe('OrderOperations', () => {
    const operations: OrderOperations = new OrderOperations();
    const userOperations: UserOperations = new UserOperations();

    const tempUser: User = {
        first_name: 'Ahmed',
        last_name: 'mostafa',
        password: 'ORDERoperations',
    };
    userOperations.createUser(tempUser);
    const tempOrder: Order = {
        user_id: '2',
        status: 'active',
    };
    const updateOrder: Order = {
        user_id: '2',
        status: 'completed',
    };

    it('should create a new Order', async () => {
        const newOrder: Order = await operations.createOrder(tempOrder);
        expect(newOrder.user_id).toBe(tempOrder.user_id);
        expect(newOrder.status).toBe(tempOrder.status);
    });

    it('should get Order', async () => {
        const Order: Order = await operations.getOrder('2');
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
