var webpack = require('webpack');

module.exports = {
    entry: [
        "./index.js"
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },{
            test: /\.less$/,
            loaders: ["style-loader", "css-loder", "less-loader"]
        }
        ]
    },
    output: {
        path: '/opt/chatApp/htdocs/web/output',
        publicPath: '/output/',
        filename: 'bundle.js'
    },
    mode : 'development'
}