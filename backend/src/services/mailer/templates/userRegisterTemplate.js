const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');

module.exports = function userRegisterTemplate(name) {

    const mailPath = path.resolve(__dirname, '..', '..', '..', 'views', 'mail', 'userRegister.hbs');
    const templateFileContent = fs.readFileSync(mailPath).toString('utf8');

    const mailTemplate = handlebars.compile(templateFileContent);

    const template = mailTemplate({
        name,
    });

    return template;
}
