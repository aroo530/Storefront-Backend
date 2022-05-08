"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
let client;
const { ENV, POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, TEST_POSTGRES_DB, } = process.env;
console.log(`${ENV} from db.ts`);
if (ENV === 'dev') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
    });
}
else if (ENV === 'test') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: TEST_POSTGRES_DB,
    });
}
module.exports = client;
