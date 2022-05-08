import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { userOperaionsRoutes } from './handlers/userHandler';
import { productOperationsRouts } from './handlers/productHandler';
import { orderOperationsRouts } from './handlers/orderHandler';

const app: express.Application = express();
const address: string = 'http://localhost:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});

userOperaionsRoutes(app);
productOperationsRouts(app);
orderOperationsRouts(app);
export = app;
