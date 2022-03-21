const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    target: 'node',
    // externals: [nodeExternals()], 
    entry: './build/main.js', 
    output: {
        path: path.join(__dirname, 'build/production'), 
        filename: 'watchdog.js',
    },
    optimization: {
        minimize: true, 
    },
};