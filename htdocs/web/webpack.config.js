var webpack = require('webpack');
var uglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: [
        "babel-polyfill",
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
        filename: '[name].bundle.js'
    },
    plugins:[new uglifyJSPlugin({sourceMap:true})],
    mode : 'development'
}