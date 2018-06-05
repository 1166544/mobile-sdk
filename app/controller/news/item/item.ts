import { Controller } from 'egg';

export default class NewsItemController extends Controller {

  public async detail() {
    const id: number = this.ctx.params.id;

    // get comment parallel
    await this.ctx.render('news/item/item.html', { id, comments: [] });
  }
}
