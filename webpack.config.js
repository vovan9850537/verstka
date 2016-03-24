/**
 * Created by marinss993 on 11.12.15.
 */

var webpack = require('webpack');
var ExtractTextPlugin = require ('extract-text-webpack-plugin');
//var Manifest    = require('manifest-revision-webpack-plugin');
var HtmlPlugin    = require('html-webpack-plugin');


module.exports =
    {
        //Точки входа
        context: __dirname + "/src",
        entry: {
            common: './js/common',
            //index: './scss/index'
        },
        //Куда лдожить готовые файлы
        output: {
            path: __dirname + "/dist",
            publicPath: '/',
            filename: "[name].min.js"
        },
        resolve: {
            extensions: ['', '.js', '.scss', '.sass', 'css']
        },
        devtool: "source-map",
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015', 'stage-0']
                    }
                },
                // {
                //     test: /\.jsx$/,
                //     exclude: /(node_modules|bower_components)/,
                //     loader: 'babel',
                //     query: {
                //         plugins: ['transform-runtime'],
                //         presets: ['es2015', 'stage-0', 'react']
                //     }
                // },
                {
                    test:   /\.css$/,
                    loader: ExtractTextPlugin.extract('css!autoprefixer?browsers=last 5 versions')
                },
                {
                    test:   /\.(scss|sass)$/,
                    loader: ExtractTextPlugin.extract('css!autoprefixer?browsers=last 5 versions!resolve-url!sass')
                },
                {
                    test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                    loader: 'url?name=[path][name].[ext]&limit=10000'
                }
            ]
        },
        plugins: [
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.DefinePlugin({
                //NODE_ENV: JSON.stringify(NODE_ENV),
                LANG: JSON.stringify("ru")
            }),
            new ExtractTextPlugin('./css/[name].css', {allChunks: true}),
            new HtmlPlugin({
                title: 'Агенство недвижимости',
                chunks: ['index', 'common'],
                filename: "./index.html",
                template: __dirname + "/src/index.html"
                //favicon: __dirname + '/src/images/favicon.ico'
            })
            //new CommonsChunkPlugin({
            //    name: "commons", // (Имя из шаблона)
            //    minChunks: 3,  // (Если код встречаеться в => модулях вынести отдельно)
            //    chunks: ["pageA", "pageB"] // (В каких модулях искать похожий код)
            //
        ],
        watch: true,
        watchOptions: {
            aggregateTimeout: 50
        }
    };