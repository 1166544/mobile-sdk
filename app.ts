export default (app) => {

    // 启动自定义方法
    app.beforeStart(async () => {
        // console.log(app.foo);
        await Promise.resolve('egg + ts');
    });

    app.onApplicationStart();
};
