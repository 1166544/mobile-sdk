'use strict';

module.exports = {
	// {
	// 	data: {
	// 		action: 'exchange',  // 'deny' || 'exchange' || 'broadcast'
	// 		payload: {},
	// 	},
	// 	meta:{
	// 		timestamp: 1512116201597,
	// 		client: 'nNx88r1c5WuHf9XuAAAB',
	// 		target: 'nNx88r1c5WuHf9XuAAAB'
	// 	},
	// }
	/**
	 * 封装数据报文 broadcast
	 *
	 * @param {*} action
	 * @param {*} [payload={}]
	 * @param {*} [metadata={}]
	 * @returns
	 */
	parseBroadcastMsg(payload = {}, metadata = {}) {
		return this.parseMsg('broadcast', payload, metadata);
	},

	/**
	 * 封装数据报文 deny
	 *
	 * @param {*} action
	 * @param {*} [payload={}]
	 * @param {*} [metadata={}]
	 * @returns
	 */
	parseDenyMsg(payload = {}, metadata = {}) {
		return this.parseMsg('deny', payload, metadata);
	},

	/**
	 * 封装数据报文 exchange
	 *
	 * @param {*} action
	 * @param {*} [payload={}]
	 * @param {*} [metadata={}]
	 * @returns
	 */
	parseExchangeMsg(payload = {}, metadata = {}) {
		return this.parseMsg('exchange', payload, metadata);
	},

	/**
	 * 封装数据报文
	 *
	 * @param {*} action
	 * @param {*} [payload={}]
	 * @param {*} [metadata={}]
	 * @returns
	 */
	parseMsg(action, payload = {}, metadata = {}) {
		const meta = Object.assign(
			{},
			{
				timestamp: Date.now()
			},
			metadata
		);

		return {
			meta,
			data: {
				action,
				payload
			}
		};
	}
};
