import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.redirect('/', '/news');
  router.get('/news', controller.news.index.index.index);
  router.get('/news/item/:id', controller.news.item.item.detail);
  router.get('/news/user/:id', controller.news.user.user.user);
};
