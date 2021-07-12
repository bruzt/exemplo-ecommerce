import { Job } from 'bull';

import mailer from "../../services/mailer/mailer";

export interface ISendEmailJob {
    from: string; 
    to: string; 
    subject: string; 
    template: string;
}

export default async function sendEmailJob({ data }: Job<ISendEmailJob>) {

    await mailer.sendMail({
        from: data.from,
        to: data.to,
        subject: data.subject,
        html: data.template,
    });
}
