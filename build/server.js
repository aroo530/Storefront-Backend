"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userHandler_1 = require("./handlers/userHandler");
const productHandler_1 = require("./handlers/productHandler");
const orderHandler_1 = require("./handlers/orderHandler");
const app = (0, express_1.default)();
const address = "http://localhost:3000";
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
(0, userHandler_1.userOperaionsRoutes)(app);
(0, productHandler_1.productOperationsRouts)(app);
(0, orderHandler_1.orderOperationsRouts)(app);
module.exports = app;
