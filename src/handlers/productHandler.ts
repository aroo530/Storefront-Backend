import { Product, ProductOperations } from '../models/products';
import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../middleware/verifyToken';

const operations: ProductOperations = new ProductOperations();

const getProduct = async (req: Request, res: Response): Promise<void> => {
    const name: string = req.params.name;
    const product: Product = await operations.getProduct(name);
    res.json(product);
};

const getProductsByCategory = async (
    req: Request,
    res: Response
): Promise<void> => {
    const category: string = req.params.category;
    const products: Product[] = await operations.getProductsByCategory(
        category
    );
    res.json(products);
};

const getProducts = async (_req: Request, res: Response): Promise<void> => {
    const products: Product[] = await operations.getAllProducts();
    res.json(products);
};
const createProduct = async (req: Request, res: Response): Promise<void> => {
    const tempProduct: Product = req.body;
    const newProduct: Product = await operations.createProduct(tempProduct);
    res.json(newProduct);
};
const updateProduct = async (_req: Request, res: Response): Promise<void> => {
    const tempProduct: Product = _req.body;
    const updatedProduct: Product = await operations.updateProduct(tempProduct);
    res.json(updatedProduct);
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const name: string = req.params.name;
    const product: Product = await operations.deleteProduct(name);
    res.json('Product deleted');
};

export const productOperationsRouts = (app: express.Application): void => {
    app.get('/products/:name', getProduct);
    app.get('/products', getProducts);
    app.get('/products/category/:category', getProductsByCategory);
    app.post('/products', verifyAuthToken, createProduct);
    app.put('/products', verifyAuthToken, updateProduct);
    app.delete('/products/:name', verifyAuthToken, deleteProduct);
};
