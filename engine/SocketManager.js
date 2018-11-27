const socketList = Symbol('Application#socketList');
const loggerSymble = Symbol('Application#loggerSybs');

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
		return this.clientList.get(id);
	}

	/**
	 * 添加客户端引用
	 *
	 * @param {*} client
	 * @memberof SocketManager
	 */
	addClient(client) {
		const id = client.id;

		if (!this.clientList.has(id)) {
			this.clientList.set(id, client);
			this.logger.info('Connected!', id)
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
			if (value) {
				value.emit(channel, message);
			}
		});
	}

	/**
	 * 向指定的客户端发送消息
	 *
	 * @param {*} id
	 * @param {*} channel
	 * @param {*} message
	 * @memberof SocketManager
	 */
	broadcastToClient(id, channel, message) {
		this.clientList.forEach((value, key, mapObj) => {
			if (value && key === id) {
				value.emit(channel, message);
			} else {
				this.logger.info('Broad to client id:', id, 'not exist!');
			}
		});
	}

	/**
	 * 主动断开某个客户端
	 *
	 * @param {*} id
	 * @memberof SocketManager
	 */
	disconnectClient(id) {
		this.clientList.forEach((value, key, mapObj) => {
			if (value && key === id) {
				value.disconnect();
				this.logger.info('DisconnectClient client id:', id, 'successfully!');
			} else {
				this.logger.info('DisconnectClient client id:', id, 'not exist!');
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
}

module.exports = new SocketManager();
