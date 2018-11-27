'use strict';
const SocketEngine = require('../../engine/SocketEngine');

module.exports = () => {
	return async (ctx, next) => {
		// TODO: 验证合法性
		console.log(ctx.packet);

		ctx.socket.emit(SocketEngine.RESPONSE_MESSAGE, ctx.helper.parseExchangeMsg(ctx.packet));

		await next();
		console.log('packet response!');
	};
};
