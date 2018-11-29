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
		let isTransported = false;
		let transportMessage = '转发成功';
		let isTransportSuccess = false;
		const tragetId = ctx.request.body.target;

		try {
			isTransportSuccess = socketManager.broadcastToClient(
				tragetId,
				SocketEngine.RESPONSE_MESSAGE,
				ctx.helper.parseExchangeMsg(
					JSON.stringify(ctx.request.body.message)
				)
			);
			isTransported = true;
		} catch (error) {
			isTransported = false;
			transportMessage = `转发失败${error.message}`;
			ctx.logger.warn(error);
		}

		if (!isTransportSuccess) {
			isTransported = false;
			transportMessage = `转发失败 ID: ${tragetId} 不存在`;
			ctx.status = 500;
		} else {
			ctx.status = 200;
		}

		// 设置响应内容和响应状态码
		ctx.body = {
			status: ctx.status,
			success: isTransported,
			message: transportMessage
		};
	}
}
module.exports = MessagerController;
