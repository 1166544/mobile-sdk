import { Controller } from 'egg';

export default class NewsUserController extends Controller {

  public async user() {
    const id: number = this.ctx.params.id;
    const userInfo: any = await this.ctx.service.news.getUser(id);
    await this.ctx.render('news/user/user.html', { user: userInfo });
  }
}
