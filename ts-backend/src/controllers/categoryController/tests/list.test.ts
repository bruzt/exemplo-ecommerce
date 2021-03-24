import supertest from 'supertest';

import connection from '../../../databases/typeorm/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import categoryModel from '../../../models/CategoryModel';

describe('categoryController List Test Suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {
              
        return truncate();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should show all categories', async () => {

        for(let i = 0; i < 3; i++){
            
            const category = categoryModel.create({
                name: 'a' + i
            });
            await category.save();
        }

        const response = await supertest(app).get(`/categories`);
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(3);
    });
});
