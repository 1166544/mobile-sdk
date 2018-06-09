"use strict";

// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');
const devConfig = require("./build/webpack.develop");
const devToolConfig = require("./build/webpack.tool");
const devPort = 8088;
const serverPort = 7001;
const proxyUrl = 'http://localhost:' + serverPort + '/';

/**
 * 开发环境打包
 */
class DevWebpackProcessor {
    constructor() {
        // hole
    }

    getConfig() {
        return {
            // 本地开发服设置
            devServer: devConfig.getConfig(),

            // 开启调试模式
            devtool: devToolConfig.getConfig(),

            // 开发环境插件
            // plugins: [
            //     new BrowserSyncPlugin({
            //         open: false,
            //         host: 'localhost',
            //         proxy: proxyUrl,
            //         files: ['app/publicSources/**', 'app/view/**'],
            //         port: devPort,
            //         reloadDebounce: 1000
            //     }, {
            //         reload: false
            //     })
            // ]
        };
    }
}

module.exports = merge(baseConfig, new DevWebpackProcessor().getConfig());