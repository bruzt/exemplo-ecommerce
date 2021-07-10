import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { JobOptions } from 'bull'

import mailer from '../services/mailer';
import UserModel from "../models/UserModel";

interface IData {
    data: {
        user: UserModel;
    };
}

interface IJob {
    key: string;
    handle: (info: IData) => Promise<void>;
    options?: JobOptions;
}

const job: IJob = {
    key: 'ResetPasswordEmail',
    handle: async ({ data }: IData) => {

        const { user } = data;

        const token = user.id + '$' + user.reset_password_token;
        const reset_url = `${process.env.FRONTEND_URL}/forgotpass?token=${token}`;

        const mailPath = path.resolve(__dirname, '..', 'views', 'mails', 'resetPassword.hbs');
        const templateFileContent = fs.readFileSync(mailPath).toString('utf8');

        const mailTemplate = handlebars.compile(templateFileContent);

        const html = mailTemplate({
            name: user.name,
            reset_url,
            website_url: process.env.FRONTEND_URL
        });

        await mailer.sendMail({
            from: 'donotreply@companydomain.com',
            to: user.email,
            subject: 'Reset Password',
            html,
        });
    },
    options: {
        attempts: 3,
        backoff: {
            type: 'fixed',
            delay: 60000
        },
        timeout: 10000,
    },
};

export default job;
