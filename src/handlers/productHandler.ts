import { Product, ProductOperations } from '../models/products';
import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../middleware/verifyToken';

const operations: ProductOperations = new ProductOperations();

const getProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const name: string = req.params.name;
        const product: Product = await operations.getProduct(name);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const getProductsByCategory = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const category: string = req.params.category;
        const products: Product[] = await operations.getProductsByCategory(
            category
        );
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const getProducts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products: Product[] = await operations.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const tempProduct: Product = req.body;
        const newProduct: Product = await operations.createProduct(tempProduct);
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
const updateProduct = async (_req: Request, res: Response): Promise<void> => {
    try {
        const tempProduct: Product = _req.body;
        const updatedProduct: Product = await operations.updateProduct(
            tempProduct
        );
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const name: string = req.params.name;
        const product: Product = await operations.deleteProduct(name);
        res.json('Product deleted');
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const productOperationsRouts = (app: express.Application): void => {
    app.get('/products/:name', getProduct);
    app.get('/products', getProducts);
    app.get('/products/category/:category', getProductsByCategory);
    app.post('/products', verifyAuthToken, createProduct);
    app.put('/products', verifyAuthToken, updateProduct);
    app.delete('/products/:name', verifyAuthToken, deleteProduct);
};
