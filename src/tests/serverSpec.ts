import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

it('should return 200 on /', async (): Promise<void> => {
    const response = await request.get('/').expect(200);
});
