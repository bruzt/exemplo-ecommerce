const express = require('express');
const crypto = require('crypto');
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');

const UserModel = require('../../models/UserModel');
const mailer = require('../../services/mailer');

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {

    const { email } = req.body;

    try {

        const user = await UserModel.findOne({ where: { email }});

        if(!user) return res.status(400).json({ message: 'user not found' });

        const rawToken = crypto.randomBytes(20).toString('hex');

        const expires = new Date();
        expires.setHours(expires.getHours() + 1);

        user.reset_password_token = rawToken;
        user.reset_password_expires = expires;

        await user.save();

        const token = user.id + '$' + rawToken;
        const reset_url = `${process.env.FRONTEND_URL}/forgotpass?token=${token}`;

        const mailPath = path.resolve(__dirname, '..', '..', 'views', 'mail', 'resetPassword.hbs');
        const templateFileContent = fs.readFileSync(mailPath).toString('utf8');

        const mailTemplate = handlebars.compile(templateFileContent);

        const html = mailTemplate({
            name: user.name,
            reset_url,
            website_url: process.env.FRONTEND_URL
        });

        mailer.sendMail({
            from: 'donotreply@companydomain.com',
            to: email,
            subject: 'Reset Password',
            html,
        });

        return res.sendStatus(204);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
