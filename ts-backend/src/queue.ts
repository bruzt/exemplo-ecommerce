import dotenv from 'dotenv';

let env: string;
if(process.env.NODE_ENV === 'production') env = '.env';
else if(process.env.NODE_ENV === 'test') env = '.env.test';
else env = '.env.dev';

dotenv.config({
    path: env
});

//////////////////////////////////////////////////////////////

import Bull from 'bull';

import sendEmailJob from './jobs/sendEmailJob';

const redisConfig = {
    host: process.env.REDIS_HOST as string,
    port: Number(process.env.REDIS_PORT),
};

export const sendEmailQueue = new Bull('SendEmailQueue', {
    redis: redisConfig,
    limiter: { // executa no maximo 8 jobs por minuto
        max: 8,
        duration: 60000,
    }
});

sendEmailQueue.process(sendEmailJob);
