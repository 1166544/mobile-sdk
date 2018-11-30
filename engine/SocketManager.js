const socketList = Symbol('Application#socketList');
const loggerSymble = Symbol('Application#loggerSybs');
const md5 = require('crypto-md5');

class SocketManager {
	constructor() {
		// hole
	}

	/**
	 * 客户端列表
	 *
	 * @readonly
	 * @memberof SocketManager
	 */
	get clientList() {
		if (!this[socketList]) {
			this[socketList] = new Map();
		}

		return this[socketList];
	}

	/**
	 * 日志引用
	 *
	 * @readonly
	 * @memberof SocketManager
	 */
	get logger() {
		if (!this[loggerSymble]) {
			this[loggerSymble] = console;
		}

		return this[loggerSymble];
	}

	/**
	 * 日志引用
	 *
	 * @readonly
	 * @memberof SocketManager
	 */
	set logger(value) {
		this[loggerSymble] = value;
	}

	/**
	 * 获取客户端SOCKET
	 *
	 * @param {*} id
	 * @returns
	 * @memberof SocketManager
	 */
	getClient(id) {
		if (this.clientList.has(id)) {
			const clientData = this.clientList.get(id);

			return clientData;
		}
		return null;
	}

	/**
	 * 添加客户端引用
	 *
	 * @param {*} userId
	 * @param {*} client
	 * @memberof SocketManager
	 */
	addClient(userId, client) {
		const id = client.id;

		if (!this.clientList.has(id)) {
			this.clientList.set(id, {userId, socket: client});
			this.logger.info(`
				Connected!!!
				SocketID: ${id}
				UserId: ${userId}
			`);
		} else {
			this.logger.info('Add client id:', id, 'has exist!');
		}
	}

	/**
	 * 移除客户端
	 *
	 * @param {*} client
	 * @memberof SocketManager
	 */
	destroyClient(client) {
		const id = client.id;

		if (this.clientList.has(id)) {
			this.clientList.delete(id);
			this.logger.info('Disconnect!', id);
		} else {
			this.logger.info('Destroy id:', id, 'not exist!');
		}
	}

	/**
	 * 向指定的客户端发送消息
	 *
	 * @param {*} id
	 * @param {*} userId
	 * @param {*} channel
	 * @param {*} message
	 * @memberof SocketManager
	 */
	broadcastToClient(id, userId, channel, message) {
		let isTransportSuccess = false;
		const value = this.getClient(id);

		if (value && value.socket && value.userId === userId) {
			value.socket.emit(channel, message);
			isTransportSuccess = true;
		} else {
			this.logger.info('Broadcast to client id:', id, 'not exist!');
		}

		return isTransportSuccess;
	}

	/**
	 * 断线重连时更新用户ID
	 *
	 * @param {*} id
	 * @param {*} userId
	 * @memberof SocketManager
	 */
	updateUserId(id, userId) {
		let updateResult = false;
		const value = this.getClient(id);

		if (value && value.userId) {
			value.userId = userId;
			this.logger.info('Client userId updated:', userId);
			updateResult = true;
		} else {
			this.logger.info('Client userId:', userId, 'not exists, update FAIL!');
		}

		return updateResult;
	}

	/**
	 * 主动断开某个客户端
	 *
	 * @param {*} id
	 * @memberof SocketManager
	 */
	disconnectClient(id) {
		const value = this.getClient(id);

		if (value && value.socket) {
			this.destroyClient(value);
			value.socket.disconnect();
			this.logger.info('DisconnectClient client id:', id, 'successfully!');
		} else {
			this.logger.info('DisconnectClient client id:', id, 'not exist!');
		}
	}

	/**
	 * 向所有客户端广播消息
	 *
	 * @param {*} channel
	 * @param {*} message
	 * @memberof SocketManager
	 */
	broacastClients(channel, message) {
		this.clientList.forEach((value, key, mapObj) => {
			//value - Map对象里每一个键值对的值
			//key - Map对象里每一个键值对的键
			//mapObj - Map对象本身
			if (value && value.socket) {
				value.socket.emit(channel, message);
			}
		});
	}

	/**
	 * 全局广播
	 *
	 * @param {*} client
	 * @param {*} channel
	 * @param {*} message
	 * @memberof SocketManager
	 */
	broadcast(client, channel, message) {
		if (client && channel && message) {
			client.broadcast.emit(channel, message);
		}
	}

	/**
	 * 数据合法性校验
	 *
	 * @param {*} ctx
	 * @memberof SocketManager
	 */
	checkLegal(ctx) {
		const socketConfig = ctx.app.config.socketConfig;
		const packet = ctx.packet;
		let isLegal = false;

		if (packet && packet.length > 0) {
			const packageData = packet[1];

			if (packageData && socketConfig && packageData.meta && packageData.meta.sign && packageData.meta.app && packageData.meta.timestamp) {
				const appName = packageData.meta.app;
				const signConfigData = socketConfig[appName];
				const verifyStr = `${appName}${signConfigData.key}${packageData.meta.timestamp}`;
				const signString = md5(verifyStr, 'hex');

				if (signString === packageData.meta.sign) {
					isLegal = true;
				}
			}
		}

		if (!isLegal) {
			ctx.logger.info('Sign illegal..', packet);
		}

		return isLegal;
	}
}

module.exports = new SocketManager();
