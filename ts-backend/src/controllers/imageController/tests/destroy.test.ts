import supertest from 'supertest';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import CategoryModel from '../../../models/CategoryModel';
import ProductModel from '../../../models/ProductModel';
import ImageModel from '../../../models/ImageModel';

const copyFileAsync = promisify(fs.copyFile);
const filePath = path.resolve(__dirname, '../../../testUtils/files/test-img.png');

const fakeUser = {
    name: "fake user",
    cpf: "61311682023",
    email: "fake@admin.com",
    password: "123456"
}

const fakeCategory = {
    name: 'fake category',
}

const fakeProduct = {
    title: 'fake product',
    description: 'bla bla bla',
    html_body: '<p>vai</p>',
    price: "10.50",
    quantity_stock: 100,
    tangible: true,
    weight: "5",
    length: 15,
    height: 15,
    width: 15,
}

describe('imageController Test Suit', () => {

    beforeAll( () => {

        return typeormConnection;
    });

    beforeEach( () => {
              
        return truncate();
    });

    afterAll( async () => {

        await sonicConnection.search.close();
        await sonicConnection.ingest.close();

        return (await typeormConnection).close();
    });

    it('should erase an image', async () => {

        const copyFilePath = path.resolve(__dirname, '../../../../uploads/test-img.png');

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const product = ProductModel.create({ ...fakeProduct, category_id: category.id });
        await product.save();

        const image = ImageModel.create({ url: copyFilePath, filename: 'test-img.png', product_id: product.id });
        await image.save();

        if(process.env.IMG_STORAGE_LOCATION == 'local'){

            await copyFileAsync(filePath, copyFilePath);
        }

        const response = await supertest(app).delete(`/products/images/${image.id}`)
            .set('authorization', 'Bearer ' + token)
        ;
        
        expect(response.status).toBe(204);
    });

    it('should return error for "image not found"', async () => {
        
        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const response = await supertest(app).delete(`/products/images/5`)
            .set('authorization', 'Bearer ' + token)
        ;
        
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("image not found");
    });
});
