"use strict";
// import { Product, ProductOperations } from "../../models/products";
// const operations: ProductOperations = new ProductOperations();
// describe("product operations", () => {
//   const tempProd: Product = {
//     name: "iphone",
//     stock: 10,
//     price: 999.99,
//     category: "electronics",
//   };
//   const updateProd: Product = {
//     name: "iphone",
//     stock: 20,
//     price: 1999.99,
//     category: "electronics",
//   };
//   it("should create a new product", async () => {
//     const newProd: Product = await operations.createProduct(tempProd);
//     expect(newProd.name).toEqual(tempProd.name);
//   });
//   it("should get product", async () => {
//     const prod: Product = await operations.getProduct("iphone");
//     console.log(prod);
//     expect(prod.name).toEqual("iphone");
//     expect(prod.stock).toEqual(10);
//     expect(prod.price).toEqual(999.99);
//     expect(prod.category).toEqual("electronics");
//   });
//   it("should get all products", async () => {
//     expect((await operations.getAllProducts()).length).toEqual(1);
//   });
//   it("should update product", async () => {
//     const prod = await operations.updateProduct(updateProd);
//     expect(prod.name).toEqual(updateProd.name);
//     expect(prod.stock).toEqual(updateProd.stock);
//     expect(prod.price).toEqual(updateProd.price);
//     expect(prod.category).toEqual(updateProd.category);
//   });
//   it("should delete product", async () => {
//     const prod = await operations.deleteProduct("iphone");
//     expect(prod.name).toEqual(updateProd.name);
//     expect(prod.stock).toEqual(updateProd.stock);
//     expect(prod.price).toEqual(updateProd.price);
//     expect(prod.category).toEqual(updateProd.category);
//   });
// });
