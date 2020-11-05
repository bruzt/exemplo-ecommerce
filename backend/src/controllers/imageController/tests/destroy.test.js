const supertest = require('supertest');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const truncate = require('../../../testUtils/truncate');
const factories = require('../../../testUtils/factories');
const app = require('../../../app');

const copyFileAsync = promisify(fs.copyFile);

const filePath = path.resolve(__dirname, '../../../testUtils/files/test-img.png');

describe('imageController Test Suit', () => {

    beforeEach( () => {
       
        return truncate();
    });

    it('should erase an image', async () => {

        const copyFilePath = path.resolve(__dirname, '../../../../uploads/test-img.png');

        const category = await factories.create('Category');
        const product = await factories.create('Product', { category_id: category.id });
        const image = await factories.create('Image', { url: copyFilePath, filename: 'test-img.png', product_id: product.id });
        
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