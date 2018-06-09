"use strict";
const path = require("path");

/**
 * 处理文件类型
 */
class ResolveProcessor {
    constructor() {
        // hole
    }

    getConfig() {
        return {
            alias: {
                path_components: path.join(__dirname, "../../client/components"),     // 公共组件目录
                path_images: path.join(__dirname, "../../client/images"),             // 公共资源目录
                path_styles: path.join(__dirname, "../../client/styles"),             // 公共样式目录
                path_view: path.join(__dirname, "../../client/view"),                 // 模板目录
            },
            extensions: [".tsx", ".ts", ".js", ".json"],
        };
    }
}

module.exports = new ResolveProcessor();
