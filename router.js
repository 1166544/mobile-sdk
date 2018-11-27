'use strict';

module.exports = app => {
  // app.io.of('/')
  app.io.route('requestMessage', app.io.controller.chat.index);

  // app.io.of('/chat')
  app.io.of('/requestMessage').route('requestMessage', app.io.controller.chat.index);
};
