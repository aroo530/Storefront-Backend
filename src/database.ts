import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

let client: any;

const {
    ENV,
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    TEST_POSTGRES_DB,
} = process.env;

// console.log(`${ENV} from db.ts`);

if (ENV === 'dev') {
    client = new Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
    });
} else if (ENV === 'test') {
    client = new Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: TEST_POSTGRES_DB,
    });
}

export = client;
