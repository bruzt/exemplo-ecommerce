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

import celebrateCustomErrors from './middlewares/celebrateCustomErrors';
import socket from './websocket/socketConnection';
import './databases/typeorm/connection';

import routes from './routes';

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: process.env.CORS_ORIGIN_URL }));
app.use(express.json());

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
socket.socketConnection(server);
app.use(routes);

app.use(celebrateCustomErrors);

export default server;
