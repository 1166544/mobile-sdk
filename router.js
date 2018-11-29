'use strict';
const SocketEngine = require('./engine/SocketEngine');

module.exports = app => {
	const { router, controller } = app;

	// app.io.of('/')
	app.io.route(SocketEngine.REQUEST_MESSAGE, app.io.controller.messager.index);

	// app.io.of('/requestMessage')
	app.io
		.of(`/${SocketEngine.REQUEST_MESSAGE}`)
		.route(SocketEngine.REQUEST_MESSAGE, app.io.controller.messager.index);

	// 中转从页面发送的消息请求
	router.post('/api/transportMessage', controller.api.messager.index.index);
};
