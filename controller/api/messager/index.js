'use strict';

const Controller = require('egg').Controller;
const socketManager = require('../../../engine/SocketManager');
const SocketEngine = require('../../../engine/SocketEngine');

class MessagerController extends Controller {

	/**
	 * 中转从页面发送的消息请求，再转发给特定客户端
	 *
	 * @memberof MessagerController
	 */
	async index() {

		const { ctx, service } = this;
		const createRule = {
			timestamp: { type: 'number' },
			app: { type: 'string' },
			target: { type: 'string' },
			sign: { type: 'string' },
			message: { type: 'object' }
		};

		// 校验参数
		ctx.validate(createRule);

		// 发送给指定客户端
		socketManager.broadcastToClient(
			ctx.request.body.target,
			SocketEngine.RESPONSE_MESSAGE,
			ctx.helper.parseExchangeMsg(JSON.stringify(ctx.request.body.message))
		);

		// 设置响应内容和响应状态码
		ctx.body = {};
		ctx.status = 200;
	}
}
module.exports = MessagerController;
