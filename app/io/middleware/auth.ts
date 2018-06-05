import { Context } from 'egg';

export default function authMiddleware() {
  return async (ctx: Context, next: any) => {
    // 输出连接信息
    // ctx.socket.emit('res', '建立连接');
    console.log('建立连接', ctx);

    // 从服务层拿信息
    // const say = await ctx.service.user.say();

    // 向客户端发送信息
    // ctx.socket.emit('res', 'auth!' + say);

    // 处理下一条请求
    await next();

    // 关闭时输出提示
    console.log('disconnect!');
  };
}
