"use strict";
const browserSync = require("browser-sync");
const childProcess = require("child_process");
const workerProcess = childProcess.exec("npm run webpack", {});
const socket = require("socket.io-client")("http://127.0.0.1:7001");

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
        workerProcess.stdout.on("data", function(data) {
            console.log("stdout: " + data);
        });
        workerProcess.stderr.on("data", function(data) {
            console.log("stderr: " + data);
        });
    }

    /**
     * Browsersync
     */
    processBrowserSync() {
        browserSync({
            files: [],
            host: "localhost",
            open: false,
            prot: 8088,
            proxy: {
                reqHeaders: function(config) {
                    return {
                        "accept-encoding": "identity",
                        "agent":           false,
                        "host":            "localhost",
                    };
                },
                target: "localhost:7001",
            },
        });
    }

    /**
     * 处理连接SOCKET
     */
    processSocket() {
        socket.on("connect", (e) => {
            console.log("连接成功 ", e);

            const chatStr = "request::reload";
            console.log("发送消息", chatStr);
            socket.emit("chat", chatStr);
        });

        socket.on("res", msg => {
            if (msg && msg.reload) {
                console.log(msg.message);
                browserSync.reload();
            }
        });
    }
}

module.exports = new SyncProcessor();