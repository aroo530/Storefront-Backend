import { Order, OrderOperations } from '../models/orders';
import { User, UserOperations } from '../models/users';
import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../middleware/verifyToken';
import { Product, ProductOperations } from '../models/products';
import { Cart } from '../models/carts';

const operations: OrderOperations = new OrderOperations();
const userOperations: UserOperations = new UserOperations();
const productOperations = new ProductOperations();
const getOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: User = await userOperations.getIdByFirstName(
            req.params.user_id
        );
        const order: Order = await operations.getOrder(user.id!);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders: Order[] = await operations.getAllOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const getId: User = await userOperations.getIdByFirstName(
            req.body.user_id
        );
        if (getId) {
            let order: Order = req.body;
            order.user_id = getId.id!;
            const newOrder: Order = await operations.createOrder(order);
            res.json(newOrder);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const updateOrderStatus = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const getId: User = await userOperations.getIdByFirstName(
            req.body.user_id
        );
        let order: Order = req.body;
        order.user_id = getId.id!;

        const updatedOrder: Order = await operations.updateOrderStatus(order!);
        res.json(updatedOrder);
    } catch (error) {
        res.status(404).json({ message: 'not found' });
    }
};

const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const getId: User = await userOperations.getIdByFirstName(
            req.params.user_id
        );
        await operations.deleteOrder(getId.id!);
        res.json('Order deleted');
    } catch (error) {
        res.status(404).json({ message: 'not found' });
    }
};

const addProductToOrder = async (
    req: Request,
    res: Response
): Promise<void> => {
    //we will get the order id from the user id
    try {
        const user: User = await userOperations.getIdByFirstName(
            req.params.user_id
        );
        const order: Order = await operations.getOrder(user.id!);

        const product: Product = await productOperations.getProduct(
            req.body.product_name
        );
        const cart: Cart = await operations.addProductToOrder(
            order.id!,
            product.id!,
            req.body.quantity
        );
        res.json(cart);
    } catch (error) {
        res.status(404).json({ message: 'not found' });
    }
};
const checkStatus = async (
    req: Request,
    res: Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const user: User = await userOperations.getIdByFirstName(
            req.body.user_id
        );
        const order: Order = await operations.getOrder(user.id!);
        if (order.status === 'active') {
            next();
        } else {
            res.status(400).send('Complete orders cannot be updated');
        }
    } catch (error) {
        res.status(404).send('Order not found');
    }
};

export const orderOperationsRouts = (app: express.Application): void => {
    app.get('/orders/:user_id', verifyAuthToken, getOrder);
    app.get('/orders', verifyAuthToken, getOrders);
    app.post('/orders', verifyAuthToken, createOrder);
    app.post('/orders/:user_id/products', verifyAuthToken, addProductToOrder);
    app.put('/orders', verifyAuthToken, checkStatus, updateOrderStatus);
    app.delete('/orders/:user_id', verifyAuthToken, deleteOrder);
};
