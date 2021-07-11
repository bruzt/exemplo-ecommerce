
const { default: queues } = require('./backgroundJobs/queues');

for(const queue of queues){
    
    queue.queue.on('failed', (job, error) => {
        console.log(`Job ${job.queue.name} failed`);
        console.log(error);
    });

    queue.process();
}
