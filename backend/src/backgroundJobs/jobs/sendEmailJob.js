
const mailer = require("../../services/mailer/mailer");

module.exports = async function sendEmailJob({ data }) {

    await mailer.sendMail({
        from: data.from,
        to: data.to,
        subject: data.subject,
        html: data.template,
    });
}
