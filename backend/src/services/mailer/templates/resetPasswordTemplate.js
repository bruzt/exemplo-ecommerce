const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');

module.exports = function resetPasswordTemplate(user) {

    const token = user.id + '$' + user.reset_password_token;
    const reset_url = `${process.env.FRONTEND_URL}/forgotpass?token=${token}`;

    const mailPath = path.resolve(__dirname, '..', '..', '..', 'views', 'mails', 'resetPassword.hbs');
    const templateFileContent = fs.readFileSync(mailPath).toString('utf8');

    const mailTemplate = handlebars.compile(templateFileContent);

    const template = mailTemplate({
        name: user.name,
        reset_url,
        website_url: process.env.FRONTEND_URL
    });

    return template;
}
