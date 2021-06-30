import dotenv from 'dotenv';

let env: string;
if(process.env.NODE_ENV === 'production') env = '.env';
else if(process.env.NODE_ENV === 'test') env = '.env.test';
else env = '.env.dev';

dotenv.config({
    path: env
});

//////////////////////////////////////////////////////////////

import express from 'express';
import cors from 'cors';
import path from 'path';
import http from 'http';

import './databases/typeorm/connection';
import socketIo from './websocket/socketIo';
import celebrateCustomErrors from './middlewares/celebrateCustomErrors';
import pagarMePeriodicCheck from './services/pagarMe/periodicCheck';

import routes from './routes';

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: process.env.CORS_ORIGIN_URL }));
app.use(express.json());

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
socketIo.socketConnection(server);
//socketIo.socketConnection().attach(server);
app.use(routes);

app.use(celebrateCustomErrors);

pagarMePeriodicCheck();

export default server;
