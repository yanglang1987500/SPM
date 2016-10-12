var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    //插件项
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new ExtractTextPlugin("[name].css")
    ],
    //页面入口文件配置
    entry:{
        index : './public/src/javascripts/index.js',
        reporth5 : './public/src/javascripts/reporth5.js',
    },
    //入口文件输出配置
    output: {
        path:  __dirname+'/public/dist/modules/',
        filename: '[name].js',
        publicPath: './'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.json$/, exclude: /node_modules/, loader: 'json' },
            { test: /\.jsx?$/, exclude:/mode_modules|libs\/[\w]+\.js/,loaders: ['jsx?harmony']},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css!sass?sourceMap")},
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=1024'},
            { test: /\.html$/, loader: 'html'}
        ],
        noParse:[/jquery.ztree.all.min/,/libs\/.*\.js/,/libs\/.*\/.*\.js/]
    },
    //其它解决方案配置
    resolve: {
        root: 'D:/work/webpack/src', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            'jquery':'./libs/echarts.min.js',
            'echarts':'./libs/echarts.min.js'
        }
    },
    externals:{
        'jquery':'jQuery',
        'echarts':'echarts'
    }
};