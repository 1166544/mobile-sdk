'use strict';

module.exports = {
	/** 保存用户ID */
	SAVE_ID:'saveId',

	/** 请求用户ID */
	REQUEST_ID:'requestId',

	/** 发送消息给其它用户 */
	SEND_TO_OTHERS: 'sendToOthers',

	/** 断线重连更新用户ID */
	RE_CONNECT_AND_UPDATES: 'reconnectAndUpdates',

	/** 断线重连更新成功 */
	RE_CONNECT_UPDATED: 'reconnectUpdated',

	/** 拒绝连接 */
	DENY: 'deny',

	/** 交换信息 */
	EXCHANGE: 'exchange',

	/** 广播 */
	BROADCAST: 'broadcast',

	/** 连接成功 */
	CONNECT: 'connect',

	/** 断开连接 */
	DISCONNECT: 'disconnect'
}
