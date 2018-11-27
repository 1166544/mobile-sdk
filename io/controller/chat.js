'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    async index() {
      const message = this.ctx.args[0];
      console.log('requestMessage :', message + ' : ' + process.pid);

      const say = await this.ctx.service.user.say();
      
      // 向前用户端发送消息
      this.ctx.socket.emit('responseMessage', say);

      // 向所有用户广播消息
      this.ctx.socket.broadcast.emit('responseMessage', 'this is broadcast message');

      // 向指定用户发送消息
    }
  }
  return Controller;
};
