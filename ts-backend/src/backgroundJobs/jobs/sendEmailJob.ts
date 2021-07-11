import { Job } from 'bull';

import mailer from "../../services/mailer";

export interface ISendEmailJob {
    from: string; 
    to: string; 
    subject: string; 
    html: string;
}

export default async function sendEmailJob({ data }: Job<ISendEmailJob>) {

    await mailer.sendMail({
        from: data.from,
        to: data.to,
        subject: data.subject,
        html: data.html,
    });
}
