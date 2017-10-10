'use strict';

const env = process.env.NODE_ENV;
const defaultPort = env !== 'test' ? 4000 : 5000;
const port = process.env.PORT || defaultPort;

export default port;
