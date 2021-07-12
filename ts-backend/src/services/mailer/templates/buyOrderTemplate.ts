import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';

import ProductModel from '../../../models/ProductModel';

export default function userRegisterTemplate(
    products: ProductModel[], 
    quantityBuyed: number[], 
    freight: number,
    totalPrice: number,
) {

    const serializedProducts = products.map( (product, index) => ({
            ...product,
            quantityBuyed: quantityBuyed[index],
        }
    ));

    const mailPath = path.resolve(__dirname, '..', '..', '..', 'views', 'mails', 'buyOrder.hbs');
    const templateFileContent = fs.readFileSync(mailPath).toString('utf8');

    const mailTemplate = handlebars.compile(templateFileContent);

    const template = mailTemplate({
        products: serializedProducts,
        freight: Number(freight).toFixed(2),
        totalPrice: Number(totalPrice + freight).toFixed(2),
    });

    return template;
}
