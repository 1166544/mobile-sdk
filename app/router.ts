import { Application } from 'egg';
import NewsRouter from './routers/NewsRouter';
import TestRouter from './routers/TestRouter';

export default (app: Application) => {
  // 新闻列表页示例
  NewsRouter(app);

  // 测试页示例
  TestRouter(app);
};
