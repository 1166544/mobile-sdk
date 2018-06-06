"use strict";
const browserSync = require("browser-sync");
const childProcess = require("child_process");
const workerProcess = childProcess.exec("npm run webpack", {});
const socket = require("socket.io-client")("http://127.0.0.1:7001");

// 预处理
processWebpack();
processBrowserSync();
processSocket();

/**
 * 处理打包
 */
function processWebpack() {
    workerProcess.stdout.on("data", function(data) {
        console.log("stdout: " + data);
    });
    workerProcess.stderr.on("data", function(data) {
        console.log("stderr: " + data);
    });
}

/**
 * Run Browsersync with server config
 */
function processBrowserSync() {
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
function processSocket() {
    socket.on("connect", (e) => {
        console.log("连接成功 ", e);

        const chatStr = "hello world!";
        console.log("发送消息", chatStr);
        socket.emit("chat", chatStr);
    });

    socket.on("res", msg => {
        console.log("res from server: %s!", msg);
    });
}
