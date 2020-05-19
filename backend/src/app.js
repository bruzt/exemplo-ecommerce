require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const trimBody = require('./middlewares/trimBody');

const routes = require('./routes');
require('./database/connection');

const app = express();
 
app.use(cors({ origin: process.env.CORS_ORIGIN_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(trimBody);

app.use(routes);

app.use(errors());
    
module.exports = app;