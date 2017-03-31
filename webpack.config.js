var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var fs = require('fs');

module.exports = function(isProd){
    return {
        //插件项
        plugins: [
            new webpack.optimize.CommonsChunkPlugin("common.js"),
            new ExtractTextPlugin(isProd?"[name].[contenthash:8].css":"[name].css"),
            function() {
                this.plugin('done', stats => {
                   var map = {}, named = stats.compilation.namedChunks;
                   for(var key in named){
                        var files = named[key].files;
                        /\.js$/m.test(key) && (key = key.substr(0,key.length-3));
                        map[key] = {};
                        files.forEach(function(i,index){
                            if(/.*\.js$/m.test(i))
                                map[key].js = i;
                            if(/.*\.css$/m.test(i))
                                map[key].css = i;
                        });
                   }
                   fs.writeFile(path.join(__dirname, 'resource_map.json'), JSON.stringify(map), function (err) {
                        err && console.log("Generate Resource Map Error!");
                        err && console.log(err);
                    });
                })
            }
        ],
        //页面入口文件配置
        entry:{
            h5 : './public/src/javascripts/h5.js',
            index : './public/src/javascripts/index.js'
        },
        //入口文件输出配置
        output: {
            path:  __dirname+'/public/dist/modules/',
            filename: isProd?'[name].[hash:8].js':'[name].js',
            chunkFilename: 'chunk/[chunkhash:8].chunk.min.js',
            publicPath: '/dist/modules/'
        },
        module: {
            //加载器配置
            loaders: [
                { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
                { test: /\.json$/, exclude: /node_modules/, loader: 'json' },
                { test: /\.js$/,
                    include:[path.resolve(__dirname, "public/src/javascripts/modules")],
                    exclude:/node_modules/,
                    loader: 'babel',
                    query: {presets: ['es2015']}
                },
                { test: /\.vue?$/, exclude:/mode_modules|libs\/[\w]+\.js/,loaders: ['babel','vue']},
                { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css!sass?sourceMap")},
                { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=1024'},
                { test: /\.html$/, loader: 'html'},
                { test: /vux.src.*?js$/, loader: 'babel'}
            ],
            noParse:[/jquery.ztree.all.min/,/libs\/.*\.js/,/libs\/.*\/.*\.js/]
        },
        vue:{
            loaders:{
                sass:ExtractTextPlugin.extract('vue-style-loader', 'css-loader!sass-loader')
            }
        },
        babel: {
                presets: [require('babel-preset-es2015')],
                plugins: [require('babel-plugin-transform-runtime'),require("babel-plugin-transform-remove-strict-mode")]
        },
        //其它解决方案配置
        resolve: {
            root: 'D:/work/webpack/src', //绝对路径
            extensions: ['', '.js', '.json', '.scss'],
            alias: {
                'jquery':'./libs/jquery.min.js',
                'echarts':'./libs/echarts.min.js',
                'vue$': 'vue/dist/vue.js',
                'vux-components': 'vux/src/components'
            }
        },
        externals:{
            'jquery':'jQuery',
            'echarts':'echarts'
        }
    };
};