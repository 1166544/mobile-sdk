"use strict";

// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');

/**
 * 生产环境打包
 */
class ProdWebpackProcessor {
    constructor() {
        // hole
    }

    getConfig() {
        return {
            // hole
        };
    }
}

module.exports = merge(baseConfig, new ProdWebpackProcessor().getConfig());