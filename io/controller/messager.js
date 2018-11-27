'use strict';
const SocketEngine = require('../../engine/SocketEngine');

module.exports = app => {
	class Controller extends app.Controller {
		async index() {
			const message = this.ctx.args[0];
			console.log(
				SocketEngine.REQUEST_MESSAGE + ' :',
				JSON.stringify(message) + ' : ' + process.pid
			);

			// 向当前用户端发送消息
			this.ctx.socket.emit(SocketEngine.RESPONSE_MESSAGE, this.ctx.helper.parseExchangeMsg(this.ctx.socket.id));

			// 向所有用户广播消息
			this.ctx.socket.broadcast.emit(
				SocketEngine.RESPONSE_MESSAGE,
				this.ctx.helper.parseExchangeMsg('this is broadcast message')
			);

			// 向指定用户发送消息
		}
	}
	return Controller;
};
