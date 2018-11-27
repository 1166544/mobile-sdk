'use strict';
const SocketEngine = require('../../engine/SocketEngine');
const socketManager = require('../../engine/SocketManager');

module.exports = () => {
	return async (ctx, next) => {
		const id = ctx.socket.id;
		ctx.socket.emit(SocketEngine.RESPONSE_MESSAGE, `${id} auth! connected!`);
		socketManager.addClient(ctx.socket);

		await next();
		socketManager.destroyClient(ctx.socket);
	};
};
