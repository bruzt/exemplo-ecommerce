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
import { errors } from 'celebrate';

import './databases/typeorm/connection';

import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.use(errors());

export default app;
