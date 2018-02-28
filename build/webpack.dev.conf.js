const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const Utils = require('./utils')
const path = require('path')
const webpackConfig = merge(webpackBaseConfig,{
    module:{
        rules:Utils.styleLoaders({ sourceMap: false }),
    },
    devtool: '#cheap-module-eval-source-map',
    devServer:{
        contentBase:path.resolve(__dirname,'../'),
        publicPath:'/',
        port:8888,
        // open:true,
        host:'192.168.0.246',
        // hot:true,
    },
    plugins:[
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin()
    ]
})
module.exports = webpackConfig