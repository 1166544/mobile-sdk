'use strict';
const SocketEngine = require('../../engine/SocketEngine');
const socketManager = require('../../engine/SocketManager');
const SocketEnum = require('../../engine/SocketEnum');
const uuidv1 = require('uuid/v1');

module.exports = () => {
	return async (ctx, next) => {
		// 建立连接
		const id = uuidv1();
		ctx.socket.emit(SocketEngine.RESPONSE_MESSAGE, ctx.helper.parseMsg(
			SocketEnum.SAVE_ID,
			id
		));
		socketManager.logger = ctx.logger;
		socketManager.addClient(id, ctx.socket);

		await next();

		// 断开连接
		socketManager.destroyClient(ctx.socket);
	};
};
