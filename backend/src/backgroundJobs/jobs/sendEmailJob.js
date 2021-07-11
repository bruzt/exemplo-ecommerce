
const mailer = require("../../services/mailer");

module.exports = async function sendEmailJob({ data }) {

    await mailer.sendMail({
        from: data.from,
        to: data.to,
        subject: data.subject,
        html: data.html,
    });
}
