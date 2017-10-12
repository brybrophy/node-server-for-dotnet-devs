'use strict';

// Production port is process.env.PORT.
// Development port is 4000.
// Test port is 5000.

const env = process.env.NODE_ENV;
const defaultPort = env !== 'test' ? 4000 : 5000;
const port = process.env.PORT || defaultPort;

export default port;
