import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';

export default function userRegisterTemplate(name: string) {

    const mailPath = path.resolve(__dirname, '..', '..', '..', 'views', 'mails', 'userRegister.hbs');
    const templateFileContent = fs.readFileSync(mailPath).toString('utf8');

    const mailTemplate = handlebars.compile(templateFileContent);

    const template = mailTemplate({
        name,
    });

    return template;
}
