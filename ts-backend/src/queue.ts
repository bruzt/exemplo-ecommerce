import dotenv from 'dotenv';

let env: string;
if(process.env.NODE_ENV === 'production') env = '.env';
else if(process.env.NODE_ENV === 'test') env = '.env.test';
else env = '.env.dev';

dotenv.config({
    path: env
});

//////////////////////////////////////////////////////////////

import Queue from 'bull';

import jobs from './jobs';

const redisConfig = {
    host: process.env.REDIS_HOST as string,
    port: Number(process.env.REDIS_PORT),
};

const queues = Object.values(jobs).map(job => ({
    bull: new Queue(job.key, {
        redis: redisConfig,
        limiter: {
            max: 1000,
            duration: 5000, // 5 seconds
        }
    }),
    name: job.key,
    handle: job.handle,
    options: job.options,
}));

for (const queue of queues) {

    queue.bull.process(queue.handle);

    queue.bull.on('failed', (job, err) => {

        console.log('Job failed', queue.name, job.data);
        console.error(err);
    });
}

export default {
    add(name: string, data: { [key: string]: any }) {

        const queue = queues.find(queue => queue.name === name);

        return queue?.bull.add(data, queue.options);
    },
};
