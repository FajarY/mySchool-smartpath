import * as express from 'express';
import * as dotenv from 'dotenv';
import { AddressInfo } from 'net';
import path from 'path';
import * as lib from './modules/lib';
import knex from 'knex';

import indexRoute from './routes/index';
import apiRoute from './routes/api';
import loginRoute from './routes/login'
import registerRoute from './routes/register';

dotenv.config();

const app = express.default();

app.use(lib.httpRequestListener);
app.use(express.json());
app.use('/', indexRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/api', apiRoute);

//For statics
const staticPath = path.join(__dirname, 'static');
app.use(express.static(staticPath));

app.use(lib.notFoundHandler);

export var PORT:number | undefined = undefined;

const server = app.listen(Number(process.env.SERVER_PORT), process.env.SERVER_HOST as string, () =>
{
    const address = server.address() as AddressInfo;
    PORT=address.port;
    console.log(`Server started on ${address.address}, ${address.port}`);
});