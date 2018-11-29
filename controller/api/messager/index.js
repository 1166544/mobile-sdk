'use strict';

const Controller = require('egg').Controller;

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

		// 设置响应内容和响应状态码
		ctx.body = {};
		ctx.status = 200;
	}
}
module.exports = MessagerController;
