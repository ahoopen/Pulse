require('babel-core/register');
require('babel-core').transform('code', {
    presets: ['es2015-node']
});
require('babel-polyfill');
require('./server.js');
