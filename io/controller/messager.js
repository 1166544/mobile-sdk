'use strict';
const SocketEngine = require('../../engine/SocketEngine');
const SocketEnum = require('../../engine/SocketEnum');
const socketManager = require('../../engine/SocketManager');

module.exports = app => {
	class Controller extends app.Controller {
		async index() {
			const message = this.ctx.args[0];
			this.ctx.logger.info(
				SocketEngine.REQUEST_MESSAGE + ' :',
				JSON.stringify(message) + ' : ' + process.pid + '\n'
			);

			if (message && message.data) {
				switch(message.data.action) {
					case SocketEnum.RE_CONNECT_AND_UPDATES:
						// 断开重连后重构用户ID链接关系
						if (message.meta) {
							const userId = message.meta.userId;
							const socketId = this.ctx.socket.id;
							const updateResult = socketManager.updateUserId(socketId, userId);

							if (updateResult) {
								this.ctx.socket.emit(SocketEngine.RESPONSE_MESSAGE, this.ctx.helper.parseMsg(
									SocketEnum.RE_CONNECT_UPDATED,
									'socket userid updated!'
								));
							}
						}
					break;
					case SocketEnum.SEND_TO_OTHERS:
						// 向其它客户端转发消息
						let socketId = '';
						let userId = '';

						if (message.meta) {
							socketId = message.meta.target;
							userId = message.meta.userId;
						}
						socketManager.broadcastToClient(
							socketId,
							userId,
							SocketEngine.RESPONSE_MESSAGE,
							this.ctx.helper.parseExchangeMsg(message.data.payload)
						);
					break;
				}
			}

			// 向所有用户广播消息
			// this.ctx.socket.broadcast.emit(
			// 	SocketEngine.RESPONSE_MESSAGE,
			// 	this.ctx.helper.parseExchangeMsg('this is broadcast message')
			// );
		}
	}
	return Controller;
};
