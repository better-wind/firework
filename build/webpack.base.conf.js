const path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    entry:resolve('src/js/index.js'),
    output:{
        path: path.resolve(__dirname, '../dist'),
        filename:'[name].js',
        publicPath:'/'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:'babel-loader'
            },
            {
                test:/\.(png|jpe?g|gif|svg)/,
                loader:'file-loader',
                options:{
                    name:'img/[name].[ext]'
                }
            },
            {
                test:/\.mp3$/,
                loader:'file-loader',
                options:{
                    name:'audio/[name].[ext]'
                }
            }
        ]
    },
    resolve:{
        extensions:['.js'],
        alias:{
            '@':resolve('src')
        }
    }
}