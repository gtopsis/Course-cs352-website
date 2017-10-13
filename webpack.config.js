const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
    filename: 'bundle.css'
});

var config = {
    context: __dirname,
    watch: true,
    entry: './src/js/app.js', // entry point
    output: { // output folder
        path: __dirname + "/dist", // folder path
        filename: 'bundle.js' // file name
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                    }
                }]
            }, {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }, {
                test: /\.(jpg|jpeg|png|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                    }
                }]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [

        extractPlugin,
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),
        new HtmlWebpackPlugin({
            title: 'Custom template',
            template: 'src/index.html'
        }),
        new webpack.optimize.UglifyJsPlugin({
            // ...
        }),
        new BrowserSyncPlugin({
            // browse to http://localhost:80/hy352/dist during development, 
            // ./public directory is being served 
            host: 'localhost/hy352',
            port: 80,
            server: {
                baseDir: ['dist']
            },
            files: ['./dist/*.html']
        }),
        new CleanWebpackPlugin(['dist']),
    ]
}
module.exports = config;