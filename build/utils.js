var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.cssLoaders = function (options) {
    var options = options || {}
    var cssLoader = {
        loader:'css-loader',
        options:{
            sourceMap:options.sourceMap
        }
    }
    function generateLoaders(loader,loaderOptions){
        var loaders = [cssLoader]
        if(loader){
            loaders.push({
                loader:loader+'-loader',
                options:Object.assign({},loaderOptions,{
                    sourceMap:options.sourceMap
                })
            })
        }

        loaders.push({
            loader:'postcss-loader'
        })
        return ExtractTextPlugin.extract({
            use:loaders,
            fallback:'style-loader'
        })
    }
    return {
        css:generateLoaders(),
        less:generateLoaders('less'),
        scss:generateLoaders('sass'),

    }
}
exports.styleLoaders = function(options){
    var output = []
    var loaders = exports.cssLoaders(options)
    for(var extension in loaders){
        var loader = loaders[extension]
        output.push({
            test:new RegExp('\\.'+extension+'$'),
            use:loader
        })
    }
    return output

}
