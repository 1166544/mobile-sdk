# egg-socket.io

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-socket.io.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-socket.io
[travis-image]: https://img.shields.io/travis/eggjs/egg-socket.io.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-socket.io
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-socket.io.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-socket.io?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-socket.io.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-socket.io
[snyk-image]: https://snyk.io/test/npm/egg-socket.io/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-socket.io
[download-image]: https://img.shields.io/npm/dm/egg-socket.io.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-socket.io

egg 框架的 socket.io 插件

## 安装

```bash
$ npm i egg-socket.io --save
```

## 环境要求

- Node.js >= 8.0
- Egg.js >= 2.0

## 一、从H5页面通过API方式向指定客户端发送消息
```js
1.接口地址
api/transportMessage

2.参数
{
	"timestamp": 1543469988762,				// 时间截
	"app": "signatureApp",					// APP名称，这个需要服务端参与签名校验验证合法性
	"target": "-y2U2Zzjm5XLHmaGAAAA",			// 客户端ID，用于寻址
	"userId": "c43d5800-f46c-11e8-baad-0566a042750c",	// 用户唯一标识，用于断线重连
	"sign": "236e7f552a5cde6002c14c2510df1ec1",		// 握手签名
	"message": {"msg":"request a client id for others!"}	// 消息报文
}
```

# 二、发送消息给服务器获取唯一性标识
```js
socket.emit('requestMessage', helper.parseMsg('requestId', 'request a client id for communication!', metaData));

// 发送消息格式 helper.parseMsg()封装:
{
	"meta":{							// 元数据消息头
		"timestamp":1543469988762,				// 签名时间截
		"app":"signatureApp",					// APP名
		"sign":"236e7f552a5cde6002c14c2510df1ec1",		// 前端签名串
		"client":"BG1dzK23yXZBBhJnAAAA",			// 客户端ID
		"userId":"c43d5800-f46c-11e8-baad-0566a042750c",	// 用户唯一标识，用于断线重连
		"target":"BG1dzK23yXZBBhJnAAAA"				// 目标ID
	},
	"data":{							// 报文体
		"action":"requestId",					// 命令类型: 请求分配ID
		"payload":"request a client id for communication!"	// 描述内容
	}
}
```

# 三、发送即时消息给指定客户端
```js
socket.emit('requestMessage', helper.parseMsg('sendToOthers', 'request a client id for others!', metaData));

// 发送消息格式 helper.parseMsg()封装:
{
	"meta":{							// 元数据消息头
		"timestamp":1543469988762,				// 签名时间截
		"app":"signatureApp",					// APP名
		"sign":"236e7f552a5cde6002c14c2510df1ec1",		// 前端签名串
		"client":"BG1dzK23yXZBBhJnAAAA",			// 客户端ID
		"userId":"c43d5800-f46c-11e8-baad-0566a042750c",	// 客户端ID
		"target":"ylAG54uMXduHs_tMAAAA"				// 目标ID
	},
	"data":{							// 报文体
		"action":"sendToOthers",				// 命令类型: 请求分配ID
		"payload":"request a client id for others!"		// 描述内容
	}
}
```

# 四、签名规则
```js
// md5(`${appName}${key}${timestamp}`)

// key由管理员统一分配,然后存储于{app_root}/config/config.default.js
exports.socketConfig = {
	// app名称1
	signatureApp : {
	key: 'XXXXXXXXXXXXXXXXXXXXX'
	},
	// app名称2
	centralServiceApp : {
	key: 'XXXXXXXXXXXXXXXXXXXXX'
	},
};
```

# helper封装方法
```js
/**
	 * 封装数据报文 broadcast
	 *
	 * @param {*} action
	 * @param {*} [payload={}]
	 * @param {*} [metadata={}]
	 * @returns
	 */
	parseBroadcastMsg(payload = {}, metadata = {});

	/**
	 * 封装数据报文 deny
	 *
	 * @param {*} action
	 * @param {*} [payload={}]
	 * @param {*} [metadata={}]
	 * @returns
	 */
	parseDenyMsg(payload = {}, metadata = {});

	/**
	 * 封装数据报文 exchange
	 *
	 * @param {*} action
	 * @param {*} [payload={}]
	 * @param {*} [metadata={}]
	 * @returns
	 */
	parseExchangeMsg(payload = {}, metadata = {});

	/**
	 * 封装数据报文
	 *
	 * @param {*} action
	 * @param {*} [payload={}]
	 * @param {*} [metadata={}]
	 * @returns
	 */
	parseMsg(action, payload = {}, metadata = {});

// 统一返回格式:
// {
// 	data: {
// 		action: 'exchange',  // 'deny' || 'exchange' || 'broadcast'
// 		payload: {},
// 	},
// 	meta:{
// 		timestamp: 1512116201597,
// 		client: 'nNx88r1c5WuHf9XuAAAB',
// 		userId: 'c43d5800-f46c-11e8-baad-0566a042750c',
// 		target: 'nNx88r1c5WuHf9XuAAAB'
// 	},
// }	
```

# 常量命令
| 名称   |      描述      |
|----------|:-------------:|
| SAVE_ID | 保存存用户ID |
| REQUEST_ID | 请求用户ID |
| SEND_TO_OTHERS | 发送消息给其它用户 |
| RE_CONNECT_AND_UPDATES | 断线重连更新用户ID |
| RE_CONNECT_UPDATED | 断线重连更新成功 |
| DENY | 拒绝连接 |
| EXCHANGE | 交换信息 |
| BROADCAST | 广播 |
| CONNECT | 连接成功 |
| DISCONNECT | 断开连接 |

# 调用示例:
```js
// 发送给其它客户端
socket.emit(SocketEngine.REQUEST_MESSAGE, helper.parseMsg(SocketEnum.SEND_TO_OTHERS, 'request a client id for others!', metaData));

// 接受重连后更新客户端消息
socket.emit(SocketEngine.REQUEST_MESSAGE, helper.parseMsg(SocketEnum.RE_CONNECT_AND_UPDATES, 'reconnect socket!', metaData));
```

## 配置

通过 `config/plugin.js` 配置启动 Socket.IO 插件:

```js
// {app_root}/config/plugin.js
exports.io = {
  enable: true,
  package: 'egg-socket.io',
};
```

在 `config/config.${env}.js` 配置 Socket.IO ：

```js
exports.io = {
  init: { } // passed to engine.io
  namespace: {
    '/': {
      connectionMiddleware: [],
      packetMiddleware: [],
    },
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
};
```

#### uws

**Egg Socket 内部默认使用 `ws` 引擎，[uws](https://www.npmjs.com/package/uws) 因为[某些原因](https://github.com/socketio/socket.io/issues/3319)被废止。**

如坚持需要使用，请按照以下配置即可：

```js
exports.io = {
  init: { wsEngine: 'uws' },
};
```

- 有关更多 `init` 选项配置，请参考：[engine.io](https://github.com/socketio/engine.io/blob/master/README.md#methods-1) 。
- 有关更多 `Egg Socket` 相关默认配置，请参考：[config.default.js](config/config.default.js)。

### generateId

**注意：** 此函数作为接口预留，便于你按照自己的规则为每一个 socket 生成唯一的 ID：

```js
exports.io = {
  generateId: (request) => {
        // Something like UUID.
        return 'This should be a random unique ID';
    }
};
```

## 部署

### Node 配置

由于 Socket.IO 的设计缘故，多进程的 Socket.IO 服务必须在 `sticky` 模式下才能工作，否则会抛出握手异常。

所以，必须开启 `sticky` 模式：

```bash
$ # 修改 package.json 对应的 npm scripts
$ egg-bin dev --sticky
$ egg-scripts start --sticky
```

这两个脚本都会使框架启动 cluster 时使用 `sticky` 模式

```js
startCluster({
  sticky: true,
  ...
});
```

### Nginx 配置

如果你使用了 nginx 做代理转发：

```
location / {
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $host;
    proxy_pass   http://127.0.0.1:{ your node server port };
}
```

## 用法

### 目录结构

```
app
├── io
│   ├── controller
│   │   └── chat.js
│   └── middleware
│       ├── auth.js
│       ├── filter.js
├── router.js
config
 ├── config.default.js
 └── plugin.js
```

### 中间件

middleware are functions which every connection or packet will be processed by.

#### 连接中间件

- 编写连接中间件
`app/io/middleware/auth.js`
```js
module.exports = app => {
    return async (ctx, next) => {
        ctx.socket.emit('res', 'connected!');
        await next();
        // execute when disconnect.
        console.log('disconnection!');
    };
};
```
- 配置使之生效

`config/config.default.js`
```js
exports.io = {
  namespace: {
    '/': {
      connectionMiddleware: ['auth'],
    },
  },
};
```

注意，必须配置在特定的命名空间下，才会生效

#### 包中间件

- 编写包中间件
`app/io/middleware/filter.js`
```js
module.exports = app => {
    return async (ctx, next) => {
        ctx.socket.emit('res', 'packet received!');
        console.log('packet:', this.packet);
        await next();
    };
};
```
- 配置使之生效

`config/config.default.js`
```js
exports.io = {
  namespace: {
    '/': {
      packetMiddleware: ['filter'],
    },
  },
};
```

注意，必须配置在特定的命名空间下，才会生效

### 控制器

controller is designed to handle the `emit` event from the client.

example:

`app/io/controller/chat.js`
```js
module.exports = app => {
  class Controller extends app.Controller {
    async ping() {
      const message = this.ctx.args[0];
      await this.ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
    }
  }
  return Controller
};

// or async functions
exports.ping = async function() {
  const message = this.args[0];
  await this.socket.emit('res', `Hi! I've got your message: ${message}`);
};
```

下一步，在 `app/router.js` 配置路由
```js
module.exports = app => {
  // or app.io.of('/')
  app.io.route('chat', app.io.controller.chat.ping);
};
```

### 路由

路由主要负责对特定的 socket 连接不同的事件进行分发处理到对应的控制器。路由配置写在 `app/router.js` 中，实例参照上一节。

除了，业务逻辑的路由之外，还有配置几个系统内置事件：

- `disconnecting` 正在断开连接
- `disconnect` 连接已经断开
- `error` 发生了错误

示例：

`app/router.js`
```js
app.io.route('disconnect', app.io.controller.chat.disconnect);
```

`app/io/controller/chat.js`
```js
module.exports = (app) => {
  class Controller extends app.Controller {
    async disconnect() {
      const message = this.ctx.args[0];
      console.log(message);
    }
  }
  return Controller
};
```

### 会话

`egg-socket.io` 支持会话，与普通的 HTTP 会话几乎一样。

会话的创建和鉴权只发生在建立连接阶段。在包中间件和控制器中可以获取通过 `ctx.session` 获取会话对象，但是它只在连接创建。

会话功能由 [egg-session](https://github.com/eggjs/egg-session) 实现，请确保它已经开启。

## 集群

如果你的 Socket.IO 服务由多台服务器提供，那么必须思考集群方案。比如，广播，房间等功能，必须依赖集群方案。

egg-socket.io 集成了 [socket.io-redis](https://github.com/socketio/socket.io-redis) ，能够非常方便的实现集群共享资源与事件分发。

配置起来也很简单：

只需要在 `config/config.${env}.js` 配置 ：

```js
exports.io = {
  redis: {
    host: { redis server host },
    port: { redis server prot },
    auth_pass: { redis server password },
    db: 0,
  }
};
```

egg 服务在启动时，会尝试连接 redis 服务，成功后，应用会顺利启动。

## 应用于微信小程序服务端

微信小程序所采用的 WebSocket 协议版本为 13 (可抓包查看)，而 socket.io 支持的协议版本为 4 详见 [socket.io-protocol](https://github.com/socketio/socket.io-protocol)

解决方案是可以封装一个适配小程序端的 socket.io.js，Github 上也有现成的库可以参考 [wxapp-socket-io](https://github.com/wxsocketio/wxapp-socket-io) 示例代码如下：

```js
// 小程序端示例代码
import io from 'vendor/wxapp-socket-io.js';
	
const socket = io('ws://127.0.0.1:7001');
socket.on('connect', function () {
  socket.emit('chat', 'hello world!');
});
socket.on('res', msg => {
  console.log('res from server: %s!', msg);
});
```

## 问题 & 建议

请访问 [here](https://github.com/eggjs/egg/issues).

##

[MIT](LICENSE)
