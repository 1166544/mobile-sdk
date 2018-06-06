import { DefaultConfig } from './config.default';

export default () => {
  const config: DefaultConfig = {};
  config.news = {
    pageSize: 20,
  };

  // 开发环境SOCKET配置
  config.io = {
    init: { test: 'test' }, 
    namespace: {
      '/': {
        connectionMiddleware: [ 'auth' ],
        packetMiddleware: [ 'filter' ],
      },
      '/chat': {
        connectionMiddleware: [ 'auth' ],
        packetMiddleware: [],
      },
      // redis: {
      //   host: { redis server host },
      //   port: { redis server prot },
      //   auth_pass: { redis server password },
      //   db: 0,
      // }
    },
  };

  return config;
};
