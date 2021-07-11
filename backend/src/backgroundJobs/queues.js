const dotenv = require('dotenv');

let env;
if(process.env.NODE_ENV === 'production') env = '.env';
else if(process.env.NODE_ENV === 'test') env = '.env.test';
else env = '.env.dev';

dotenv.config({
    path: env
});

//////////////////////////////////////////////////////////////

const Bull = require('bull');

const sendEmailJob = require('./jobs/sendEmailJob');

const redisConfig = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
};

const sendEmailQueue = new Bull('SendEmailQueue', {
    redis: redisConfig,
    limiter: { // envia no maximo 8 emails por minuto
        max: 8,
        duration: 60000,
    }
});

exports.sendEmailQueue = sendEmailQueue;

exports.default = [
    { 
        queue: sendEmailQueue,
        process: () => sendEmailQueue.process(sendEmailJob),
    },
]
