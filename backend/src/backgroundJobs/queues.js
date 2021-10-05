const dotenv = require("dotenv");

let env;
if (process.env.NODE_ENV === "production") env = ".env";
else if (process.env.NODE_ENV === "test") env = ".env.test";
else env = ".env.dev";

dotenv.config({
  path: env,
});

//////////////////////////////////////////////////////////////

const Bull = require("bull");

const sendEmailJob = require("./jobs/sendEmailJob");

const sendEmailQueue = new Bull("SendEmailQueue", {
  redis: process.env.REDIS_URL,
  limiter: {
    // envia no maximo 8 emails por minuto
    max: 8,
    duration: 60000,
  },
  defaultJobOptions: {
    priority: 2,
    removeOnComplete: true,
    // tenta reenviar 3 vezes com um minuto de diferença e falha se demorar mais de 10 segundos
    attempts: 3,
    backoff: {
      type: "fixed",
      delay: 60000,
    },
    timeout: 10000,
  },
});

exports.sendEmailQueue = sendEmailQueue;

exports.default = [
  {
    queue: sendEmailQueue,
    process: () => sendEmailQueue.process(sendEmailJob),
  },
];
