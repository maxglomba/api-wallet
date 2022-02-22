process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';
// Env files
import * as dotenv from 'dotenv';

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});

console.log(process.env.APP_FOO);

//initialize express
import express = require('express');
import { loadControllers } from 'awilix-express';
import loadContainer from './container';

const app: express.Application = express();

//Container
loadContainer(app);

//Controllers
app.use(loadControllers(
    'controllers/*.ts',
    { cwd: __dirname}
));

export { app };