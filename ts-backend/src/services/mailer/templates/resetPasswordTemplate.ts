import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';

import UserModel from '../../../models/UserModel';

export default function resetPasswordTemplate(user: UserModel) {

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
