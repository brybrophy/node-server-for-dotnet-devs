'use strict';

// Require environment variables from .env file when not in production
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ silent: true });
}

import * as chalk from 'chalk';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './ioc/ioc';
import { enableLogging } from '../utilities/enableLogging';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import port from '../utilities/port';
let app;

// Load all injectable entities.
// The @provide() annotation will then automatically register them.
import './ioc/loader';

// Create a connection to the ORM.
// Note that its NOT an active database connection.
console.log(`----------------->Bootrapping the application`);

createConnection()
    .then(async connection => {
        const server = new InversifyExpressServer(container);

        server.setConfig(app => {
            // Remove x-powered-by from headers
            app.disable('x-powered-by');

            // Enable gzip and deflate compression
            app.use(compression());

            // Enable logging with morgan
            enableLogging(app);

            // CSRF protection
            app.use('/api', (req, res, next) => {
                if (/json/.test(req.get('Accept'))) {
                    return next();
                }

                res.sendStatus(406);
            });

            // Parse json from body, and cookies
            app.use(bodyParser.json());
            app.use(cookieParser());
        });

        // Error handling Middleware.
        server.setErrorConfig(app => {
            // eslint-disable-next-line max-params
            app.use((err, req, res, next) => {
                // eslint-disable-next-line no-console
                console.error(err.stack);
                res.sendStatus(500);
            });
        });

        // Start server
        app = server.build();

        app.listen(port);
        console.log(`----------------->On PORT ${chalk.bold.yellow(port)}, running the API is...`);
    })
    .catch(error => console.log('TypeORM connection error: ', error));

export default app;
