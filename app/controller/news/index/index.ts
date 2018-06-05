import { Controller } from 'egg';

export default class NewsIndexController extends Controller {
  /**
   * news 页面入口
   */
  public async index() {
    // 获取配置数据
    const pageSize: number = this.app.config.news.pageSize;

    // 获取页面请求数据
    const page: number = parseInt(this.ctx.query.page, 10) || 1;

    // 获取数据
    const idList: any[] = await this.ctx.service.newsService.getTopStories(
      page,
    );

    // 并行调用获取数据
    const newsList: any[] = await Promise.all(
      idList.map((id) => this.ctx.service.newsService.getItem(id)),
    );

    // 传入页面数据
    const pageData: any = { list: newsList, page, pageSize };

    // 渲染页面模板
    await this.ctx.render('news/index/index.html', pageData);
  }
}
