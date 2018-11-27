'use strict';
const SocketEngine = require('./engine/SocketEngine');

module.exports = app => {
	// app.io.of('/')
	app.io.route(SocketEngine.REQUEST_MESSAGE, app.io.controller.chat.index);

	// app.io.of('/requestMessage')
	app.io
		.of(`/${SocketEngine.REQUEST_MESSAGE}`)
		.route(SocketEngine.REQUEST_MESSAGE, app.io.controller.chat.index);
};
