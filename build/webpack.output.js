"use strict";
const path = require("path");

/**
 * 输出JS文件位置
 * 生成 a.bundle.js  b.bundle.js  jquery.bundle.js
 */
class OutputProcessor {
    constructor() {
        // hole
    }

    getConfig() {
        return {
            publicPath: `/publicSources/`,
            path: path.resolve(__dirname, '../app/publicSources'),
            filename: 'scripts/[name].js',
            chunkFilename: 'scripts/[id].js?[chunkhash]'
        };
    }
}

module.exports = new OutputProcessor();
