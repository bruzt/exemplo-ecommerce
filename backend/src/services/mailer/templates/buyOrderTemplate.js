const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');

module.exports = function userRegisterTemplate(products, quantityBuyed, freight,totalPrice,) {

    const serializedProducts = products.map( (product, index) => ({
        ...product.dataValues,
        quantityBuyed: quantityBuyed[index],
    }));

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
