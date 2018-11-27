'use strict';
const SocketEngine = require('../../engine/SocketEngine');
const socketManager = require('../../engine/SocketManager');

module.exports = () => {
	return async (ctx, next) => {
		// 建立连接
		const id = ctx.socket.id;
		ctx.socket.emit(SocketEngine.RESPONSE_MESSAGE, ctx.helper.parseExchangeMsg(`${id} auth! connected!`));
		socketManager.logger = ctx.logger;
		socketManager.addClient(ctx.socket);

		await next();

		// 断开连接
		socketManager.destroyClient(ctx.socket);
	};
};
