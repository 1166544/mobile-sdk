"use strict";
const childProcess = require("child_process");
const workerProcess = childProcess.exec("npm run webpack", {});
const socket = require("socket.io-client")("http://127.0.0.1:7001");
let bs = null;

/**
 * 本地dev打包处理器
 */
class SyncProcessor {

    constructor() {
        this.processWebpack();
        this.processBrowserSync();
        this.processSocket();
    }

    /**
     * 处理打包
     */
    processWebpack() {
        workerProcess.stdout.on("data", (data) => {
            console.log("stdout: " + data);
        });
        workerProcess.stderr.on("data", (data) => {
            console.log("stderr: " + data);
        });
    }

    /**
     * Browsersync
     */
    processBrowserSync() {
        bs = require("browser-sync").create();
        bs.init({
            files: ['app/publicSources/**', 'app/view/**'],
            host: "localhost",
            open: false,
            port: 8088,
            proxy: "localhost:7001"
        });
    }

    /**
     * 处理连接SOCKET
     */
    processSocket() {
        socket.on("connect", (e) => {
            const chatStr = " request::reload";
            socket.emit("chat", chatStr);
        });

        socket.on("res", msg => {
            if (msg && msg.reload) {
                console.log(msg.message);
                bs.reload("*.html");
            }
        });
    }
}

module.exports = new SyncProcessor();