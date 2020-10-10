const express = require('express');
const crypto = require('crypto');

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

        await mailer.sendMail({
            from: 'donotreply@companydomain.com',
            to: email,
            subject: 'Reset Password',
            template: 'resetPassword',
            context: { 
                name: user.name,
                reset_url,
                website_url: process.env.FRONTEND_URL
             }
        });

        return res.sendStatus(200);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
