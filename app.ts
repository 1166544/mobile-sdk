export default (app) => {

    // 启动自定义方法
    app.beforeStart(async () => {
        await Promise.resolve('egg + ts');
    });

    // 启动执行勾子
    app.onApplicationStart();
};
