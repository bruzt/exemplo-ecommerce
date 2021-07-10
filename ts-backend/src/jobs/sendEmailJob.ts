import mailer from "../services/mailer";

interface ISendEmailJob {
    data: {
        from: string; 
        to: string; 
        subject: string; 
        html: string;
    }
}

export default async function sendEmailJob({ data }: ISendEmailJob) {
    
    await mailer.sendMail({
        from: data.from,
        to: data.to,
        subject: data.subject,
        html: data.html,
    });
}
