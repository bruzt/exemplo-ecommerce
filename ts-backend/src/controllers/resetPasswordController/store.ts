import { Request, Response } from 'express';
import crypto from 'crypto';

import UserModel from '../../models/UserModel';
import resetPasswordTemplate from '../../services/mailer/templates/resetPasswordTemplate';
import { sendEmailQueue } from '../../backgroundJobs/queues';

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

        const template = resetPasswordTemplate(user);

        await sendEmailQueue.add({
            from: 'donotreply@companydomain.com',
            to: user.email,
            subject: 'E-Commerce Reset Password',
            template,
        }, { 
            // tenta reenviar 3 vezes com um minuto de diferença
            attempts: 3,
            backoff: { 
                type: 'fixed',
                delay: 60000
            },
            timeout: 10000,
        });

        return res.sendStatus(204);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
