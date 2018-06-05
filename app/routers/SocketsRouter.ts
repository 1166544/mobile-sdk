import { Application } from 'egg';

export default (app: Application) => {
  const io = app['io'];

  // 默认消息处理 io.of('/')
  io.route('chat', io.controller.chat.ping);

  // 消息转发处理 io.of('/chat')
  io.of('/chat').route('chat', io.controller.chat.ping);

  // 断开连接处理 io.of('/disconnect')
  io.route('disconnect', io.controller.chat.disconnect);
};
