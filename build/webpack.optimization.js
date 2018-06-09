"use strict";
const entryPlugin = require('./webpack.entry');

/**
 * 提取js，lib1为自定义命名
 */
class OptimizationProcessor {
    constructor() {
        // hole
    }

    /**
     * splitChunks配置
     */
    getConfig() {
        const entries = entryPlugin.getConfig();
        const chunks = Object.keys(entries)
        return {
            runtimeChunk: 'single',
            splitChunks: {
                name: 'vendors',
                chunks: 'initial',
                minChunks: chunks.length
            }
        };
    }
}

module.exports = new OptimizationProcessor();