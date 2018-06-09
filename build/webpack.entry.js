"use strict";
const glob = require("glob");
const path = require('path');

/**
 * 页面入口列表处理器
 */
class WebpackEntryProcessor {

    constructor() {
        // 文件列表
        this.fileList = glob.sync("client/view/**/*.ts");

        // 模板文件目录路径
        this.pathDir = 'client/view/';

        // HRM后缀
        this.hotMiddlewareScript = '';

        this.copyTmplState = false;
    }

    /**
     * 获取多页面JS罗辑打包入口
     */
    getConfig() {
        // 生成格式内容类似:
        // {
        //     a: "./client/view/about/index/index.ts",
        //     b: "./client/view/news/index/index.ts",
        //     c: "./client/view/news/detail/detail.ts",
        // }
        let entries = {};
        let entry = '';
        let dirname = '';
        let basename = '';
        let pathname = '';
        let extname = '';

        for (let i = 0; i < this.fileList.length; i++) {
            entry = this.fileList[i];
            dirname = path.dirname(entry);
            extname = path.extname(entry);
            basename = path.basename(entry, extname);
            pathname = path.normalize(path.join(dirname, basename));
            this.pathDir = path.normalize(this.pathDir);
            if (pathname.startsWith(this.pathDir)) {
                pathname = pathname.substring(this.pathDir.length)
            }
            if (!this.copyTmplState) {
                // 处理页面模板入口
                if (pathname.indexOf('common') == -1) {
                    this.computeScriptPerfix(entries, pathname, entry, this.hotMiddlewareScript);
                }
            } else {
                // 处理样式入口
                this.computeScriptPerfix(entries, pathname, entry, this.hotMiddlewareScript);
            }

        }

        return entries;
    }

    /**
     * 计算文件路径后缀
     * @param {*} entries 
     * @param {*} pathname 
     * @param {*} entry 
     * @param {*} hotMiddlewareScript 
     */
    computeScriptPerfix(entries, pathname, entry, hotMiddlewareScript) {
        if (process.env.NODE_ENV == 'dev') {
            entries[pathname] = ['./' + entry, hotMiddlewareScript];
        } else {
            entries[pathname] = ['./' + entry];
        }
    }
}

module.exports = new WebpackEntryProcessor();
