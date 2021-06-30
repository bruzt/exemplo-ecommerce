import { Request, Response } from 'express';
import crypto from 'crypto';
import handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';

import UserModel from '../../models/UserModel';
import mailer from '../../services/mailer';

export default async function store(req: Request, res: Response) {

    const { email } = req.body;

    try {

        const user = await UserModel.findOne({ where: { email }});

        if(!user) return res.status(404).json({ message: 'user not found' });

        const rawToken = crypto.randomBytes(20).toString('hex');

        const expires = new Date();
        expires.setHours(expires.getHours() + 1);

        user.reset_password_token = rawToken;
        user.reset_password_expires = expires;

        await user.save();

        const token = user.id + '$' + rawToken;
        const reset_url = `${process.env.FRONTEND_URL}/forgotpass?token=${token}`;

        const mailPath = path.resolve(__dirname, '..', '..', 'views', 'mails', 'resetPassword.hbs');
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
