'use strict';
const md5 = require('crypto-md5');
const SocketEnum = require('./app/engine/SocketEnum');
const SocketEngine = require('./app/engine/SocketEngine');
const helper = require('./app/extend/helper');
const socketConfig = require('./config/config.default').socketConfig;

const timestamp = Date.now();
const appName = 'signatureApp';
const signKey = socketConfig[appName].key;
const verifyStr = `${appName}${signKey}${timestamp}`;
const signString = md5(verifyStr, 'hex');
let userId = null;
let targetId = '';
let socketId = '';

/** 签名头部信息 */
const metaData = {
	timestamp: timestamp,
	app: appName,
	sign: signString,
	client: socketId,
	target: targetId
};

// or http://127.0.0.1:7001/chat
const socket = require('socket.io-client')('http://127.0.0.1:7001');

socket.on(SocketEnum.CONNECT, () => {
	console.log('connect!');
});

socket.on(SocketEnum.DISCONNECT, () => {
	console.log('disconnect!');
});

socket.on(SocketEngine.RESPONSE_MESSAGE, msg => {
	console.log('res from server: %s!', JSON.stringify(msg));
	if (msg && msg.data) {
		switch(msg.data.action) {
			// 保存用户端ID后, 测试发送给其它用户端一条消息
			case SocketEnum.SAVE_ID:
				if (!userId) {
					// 首次记录ID
					userId = msg.data.payload.userId;
					socketId = msg.data.payload.socketId;
					metaData.client = socket.id;
					metaData.target = socketId;
					metaData.userId = userId;
					socket.emit(SocketEngine.REQUEST_MESSAGE, helper.parseMsg(SocketEnum.SEND_TO_OTHERS, 'request a client id for others!', metaData));

				} else {
					// 断线重连重新记录ID
					socketId = msg.data.payload.socketId;
					metaData.client = socketId;
					metaData.target = socketId;
					metaData.userId = userId;
					socket.emit(SocketEngine.REQUEST_MESSAGE, helper.parseMsg(SocketEnum.RE_CONNECT_AND_UPDATES, 'reconnect socket!', metaData));
				}

			break;
		}
	}
});
