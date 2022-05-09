import { Product, ProductOperations } from '../../models/products';
const operations: ProductOperations = new ProductOperations();

describe('product operations', () => {
    const tempProd: Product = {
        name: 'banana',
        stock: 10,
        price: 999.99,
        category: 'fruits',
    };
    const updateProd: Product = {
        name: 'banana',
        stock: 20,
        price: 999.99,
        category: 'electronics',
    };

    it('should create a new product', async () => {
        const newProd: Product = await operations.createProduct(tempProd);
        expect(newProd.name).toEqual(tempProd.name);
    });

    it('should get product', async () => {
        const prod: Product = await operations.getProduct('banana');
        console.log(prod);
        expect(prod.name).toEqual('banana');
        expect(prod.stock).toEqual(10);
        expect(prod.price).toEqual(999.99);
        expect(prod.category).toEqual('fruits');
    });

    it('should get all products', async () => {
        expect((await operations.getAllProducts()).length).toEqual(2);
    });

    it('should update product', async () => {
        const prod = await operations.updateProduct(updateProd);
        expect(prod.name).toEqual(updateProd.name);
        expect(prod.stock).toEqual(updateProd.stock);
        expect(prod.price).toEqual(updateProd.price);
        expect(prod.category).toEqual(updateProd.category);
    });

    it('should delete product', async () => {
        const prod = await operations.deleteProduct('banana');
        expect(prod.name).toEqual(updateProd.name);
        expect(prod.stock).toEqual(updateProd.stock);
        expect(prod.price).toEqual(updateProd.price);
        expect(prod.category).toEqual(updateProd.category);
    });
});
