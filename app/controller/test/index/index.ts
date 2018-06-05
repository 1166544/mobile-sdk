import { Controller } from 'egg';

export default class TestIndexController extends Controller {
  public async list() {
    const pageSize: number = this.app.config.news.pageSize;
    const page: number = parseInt(this.ctx.query.page, 10) || 1;
    const idList: any[] = await this.ctx.service.newsService.getTopStories(page);

    // get itemInfo parallel
    const newsList: any[] = await Promise.all(idList.map((id) => this.ctx.service.newsService.getItem(id)));
    await this.ctx.render('test/index/index.html', { list: newsList, page, pageSize });
  }

}
