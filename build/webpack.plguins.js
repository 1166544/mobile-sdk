"use strict";

const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const PurifyCssWebpack = require("purifycss-webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackCommonLibsPlugin = require('./webpack.inject');

class PluginProcessor {
    constructor() {
        this.templateSourcePath = 'client/view/';
    }

    getConfig() {
        const pluginList = [
            new webpack.HotModuleReplacementPlugin(),

            // 加载公共依赖
            new webpack.DllReferencePlugin({
                context: '.',
                manifest: require("./libs/libs.manifest.json"),
            }),

            // 调用之前先清除打包目录
            new CleanWebpackPlugin(
                ['publicSources', 'view'],
                {
                    root: path.resolve(__dirname, "./app"),
                    exclude: [],
                    verbose: true,
                    dry: false
                }
            ),

            // 复制非打包目录
            new CopyWebpackPlugin([{
                from: path.resolve(__dirname, "../client/assets"),
                to: "./assets",
            }]),

            // 复制JQ
            new CopyWebpackPlugin([{
                from: path.resolve(__dirname, "../build/libs"),
                to: "./scripts/common/libs",
            }]),

            // 分离css插件参数为提取出去的路径
            new ExtractTextPlugin('styles/[name].css', { allChunks: false }),

            // 消除冗余的css代码
            new PurifyCssWebpack({
                paths: glob.sync(path.join(__dirname, "client/view/*.html")),
            }),

            // 全局暴露统一入口
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                'window.$': 'jquery',
            }),
        ];

        // 复制多页面模板插件配置
        const templateList = this.getMultiTemplate();

        while (templateList.length) {
            pluginList.push(templateList.shift());
        }

        return pluginList;
    }

    /**
     * 复制多页面模板插件配置
     */
    getMultiTemplate() {
        const pluginList = [];
        const pageList = glob.sync("client/view/**/*.html");

        pageList.forEach((pathName) => {
            
            const fileName = pathName.replace(/client\//g, '');
            const scriptPreName = pathName.replace(/client\/view\//g, '');
            const scriptName = scriptPreName.replace(/\.html/g, '.js');
            const conf = {
                // 生成的html存放路径，相对于path
                filename: '../' + fileName, 

                // html模板路径
                template: pathName, 

                // js插入的位置，true/'head'/'body'/false
                inject: false, 

                // favicon: path.resolve(__dirname, pathConfig.faviconPath);
                inject: 'body',
                chunks: ['vendors', `/publicSources/scripts/${scriptName}`],
                hash: true
            };
    
            pluginList.push(new HtmlWebpackPlugin(conf));
            pluginList.push(new HtmlWebpackCommonLibsPlugin({
                paths: [`/publicSources/scripts/common/libs/libs.js`]
            }));
    
        });

        return pluginList;
    }
}

module.exports = new PluginProcessor();
