const supertest = require('supertest');

const truncate = require('../../utils/truncate');
const factories = require('../../utils/factories');
const app = require('../../../src/app');
const ProductModel = require('../../../src/models/ProductModel');

describe('categoryController Test Suit', () => {

    beforeEach( () => {
       
        return truncate();
    });

    it('should show all categories', async () => {

        for(let i = 0; i < 3; i++){
            
            await factories.create('Category', {
                name: 'a' + i
            });
        }

        const response = await supertest(app).get(`/categories`);
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(3);
    });

    it('should add a category', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).post('/categories')
            .set('authorization', `Bearer ${token}`)
            .send({
                name: 'Eletronicos'
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Eletronicos');
    });

    it('should add a category with a parent', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();
        const category = await factories.create('Category');

        const response = await supertest(app).post('/categories')
            .set('authorization', `Bearer ${token}`)
            .send({
                name: 'Eletronicos',
                parent_id: category.id
            });

        expect(response.status).toBe(200);
        expect(response.body.parent_id).toBe(category.id);
    });

    it('should return code 400 for "parent category id not found"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).post('/categories')
            .set('authorization', `Bearer ${token}`)
            .send({
                name: 'Eletronicos',
                parent_id: 5
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('parent category id not found');
    });

    it('should update a category', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();
        const category = await factories.create('Category');

        const response = await supertest(app).put(`/categories/${category.id}`)
            .set('authorization', `Bearer ${token}`)
            .send({
                name: 'Jogos'
            })

        expect(response.status).toBe(200);
    });

    it('should return code 400 for "no update has been made"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).put(`/categories/44`)
            .set('authorization', `Bearer ${token}`)
            .send({
                name: 'testecat'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('no update has been made');
    });

    it('should delete a category', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const category1 = await factories.create('Category');
        const category2 = await factories.create('Category', { name: 'categoria 2' });
        const product = await factories.create('Product', { category_id: category1.id });

        const response = await supertest(app).delete(`/categories/${category1.id}`)
            .set('authorization', `Bearer ${token}`)
            .send({
                transferToId: category2.id
            })
        ;

        const productAfter = await ProductModel.findByPk(product.id);

        expect(response.status).toBe(204);
        expect(productAfter.category_id).toBe(category2.id);
    });

    it('should return error 400 for "id and transferToId cannot be the same"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();
        
        const response = await supertest(app).delete(`/categories/1`)
            .set('authorization', `Bearer ${token}`)
            .send({
                transferToId: 1
            })
        ;

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("id and transferToId cannot be the same");
    });

    it('should return error 400 for "Category not found"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();
        
        const response = await supertest(app).delete(`/categories/1`)
            .set('authorization', `Bearer ${token}`)
            .send({
                transferToId: 2
            })
        ;

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Category not found");
    });

    it('should return error 400 for "Category to transfer not found"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const category = await factories.create('Category');
        
        const response = await supertest(app).delete(`/categories/${category.id}`)
            .set('authorization', `Bearer ${token}`)
            .send({
                transferToId: 2
            })
        ;

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Category to transfer not found");
    });

    it('should return error 400 for "Category to delete must not have childrens"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const category1 = await factories.create('Category');
        await factories.create('Category', { name: 'teste2', parent_id: category1.id });
        await factories.create('Category', { name: 'teste3' });
        
        const response = await supertest(app).delete(`/categories/${category1.id}`)
            .set('authorization', `Bearer ${token}`)
            .send({
                transferToId: 3
            })
        ;

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Category to delete must not have childrens");
    });
});