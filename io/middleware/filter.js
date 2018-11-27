'use strict';
const SocketEngine = require('../../engine/SocketEngine');
const socketManager = require('../../engine/SocketManager');

module.exports = () => {
	return async (ctx, next) => {
		// 验证合法性
		if (!socketManager.checkLegal(ctx)) {
			const illegalMsg = `Illegal signature, disconnected client ${ctx.socket.id}`;

			ctx.socket.emit(SocketEngine.RESPONSE_MESSAGE, ctx.helper.parseExchangeMsg(illegalMsg));
			socketManager.disconnectClient(ctx.socket.id);
			ctx.logger.info(ctx.packet, illegalMsg);
		}
		await next();
	};
};
