'use strict';
const SocketEngine = require('../../engine/SocketEngine');

module.exports = () => {
  return async (ctx, next) => {
    const say = await ctx.service.user.say();
    
    ctx.socket.emit(SocketEngine.RESPONSE_MESSAGE, 'auth! ' + say);
    
    await next();
    console.log('disconnect!');
  };
};
