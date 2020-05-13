const supertest = require('supertest');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const truncate = require('../../utils/truncate');
const factories = require('../../utils/factories');
const app = require('../../../src/app');

const copyFileAsync = promisify(fs.copyFile);
const unlinkAsync = promisify(fs.unlink);
const filePath = path.resolve(__dirname, '../../utils/files/test-img.png');

describe('imageController Test Suit', () => {

    beforeEach( () => {
       
        return truncate();
    });

    it('should add an image to a product', async () => {

        const user = await factories.create('User');
        const category = await factories.create('Category');
        const product = await factories.create('Product', {
            category_id: category.id
        });

        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).post(`/products/${product.id}/images`)
        .set('authorization', 'Bearer ' + token)
        .attach('file', filePath);
        
        await unlinkAsync(response.body[0]);

        expect(response.status).toBe(200);
    });

    it('should return code 400 for "product not found"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).post(`/products/40/images`)
        .set('authorization', 'Bearer ' + token)
        .attach('file', filePath);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("product not found");
    });

    it('should erase an image', async () => {

        const copyFilePath = path.resolve(__dirname, '../../../tmp/uploads/test-img.png');

        const category = await factories.create('Category');
        const product = await factories.create('Product', { category_id: category.id });
        const image = await factories.create('Image', { url: copyFilePath, product_id: product.id });
        
        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        if(process.env.IMG_STORAGE_LOCATION == 'local'){

            await copyFileAsync(filePath, copyFilePath);
        }

        const response = await supertest(app).delete(`/products/images/${image.id}`)
        .set('authorization', 'Bearer ' + token);
        
        expect(response.status).toBe(200);
    });

    it('should return code 400 for "image not found"', async () => {
        
        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).delete(`/products/images/5`)
        .set('authorization', 'Bearer ' + token);
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("image not found");
    });
});