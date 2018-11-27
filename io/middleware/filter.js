'use strict';
const SocketEngine = require('../../engine/SocketEngine');

module.exports = () => {
	return async (ctx, next) => {
		// TODO: 验证合法性
		console.log(ctx.packet);
		const say = await ctx.service.user.say();

		ctx.socket.emit(SocketEngine.RESPONSE_MESSAGE, 'packet! ' + say);

		await next();
		console.log('packet response!');
	};
};
