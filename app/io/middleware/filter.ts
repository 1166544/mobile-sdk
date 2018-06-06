import { Context } from 'egg';

export default function filterMiddleware() {
  return async (ctx: Context, next: any) => {
    
    // 告诉客户端收到信息
    // ctx.socket.emit('res', `收到客户端消息包 ${ctx.packet}`);

    // 输出当前包信息
    // console.log('收到客户端消息包:', ctx['packet']);
    
    // 从服务层拿信息
    // const say = await ctx.service.user.say();

    // 向客户端发送数据
    ctx.socket.emit('res', {reload: true, message: 'The server has received your message: ' + ctx['packet']});
    
    // 执行下一条信息
    await next();

    // console.log('packet response!');
  };
}
