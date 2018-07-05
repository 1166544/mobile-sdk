"use strict";
const path = require("path");

/**
 * 本地开发服配置
 */
class DevelopProcessor {
    constructor() {
        // hole 
    } 

    /**
     * 本地开发服配置
     */
    getConfig() {
        return {
            contentBase: path.resolve(__dirname, "../app/publicSources"),
            host: "localhost",
            hot: false,
            inline: true,
            open: true,
            port: "8088",
        };
    }
}

module.exports = new DevelopProcessor();
