'use strict';
const SocketEngine = require('../../engine/SocketEngine');
const socketManager = require('../../engine/SocketManager');
const SocketEnum = require('../../engine/SocketEnum');
const uuidv1 = require('uuid/v1');

module.exports = () => {
	return async (ctx, next) => {
		// 建立连接
		const socketId = ctx.socket.id;
		const userId = uuidv1();
		ctx.socket.emit(SocketEngine.RESPONSE_MESSAGE, ctx.helper.parseMsg(
			SocketEnum.SAVE_ID,
			{
				socketId,
				userId
			}
		));
		socketManager.logger = ctx.logger;
		socketManager.addClient(userId, ctx.socket);

		await next();

		// 断开连接
		socketManager.destroyClient(ctx.socket);
	};
};
