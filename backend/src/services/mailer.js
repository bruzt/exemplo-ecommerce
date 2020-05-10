const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const viewDir = path.resolve('./src/views/mail');

const mailer = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS
    }
});

mailer.use(
    'compile', 
    hbs({
        viewEngine: {
            partialsDir: viewDir,
            layoutsDir: viewDir,
            defaultLayout: 'resetPassword.html',
        },
        viewPath: viewDir,
        extName: '.html'
    })
);

module.exports = mailer;