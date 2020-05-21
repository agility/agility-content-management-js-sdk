const path = require('path');


const nodeConfig = {
    target: 'node',
    entry: './src/content-management.js',
    output: {
        filename: 'agility-content-management.node.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'agilityMgmt',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    optimization: {
        minimize: false
    },
    module: {
        rules : [
        // JavaScript
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        }
        ]
    },
    // Plugins
    plugins: []
}

module.exports = nodeConfig