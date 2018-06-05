import { Application } from 'egg';

export default {
    get foo(): string {
        return 'hi';
    },

    set foo(arg: string) {
        arg = arg + '';
        // hole
    },

    /**
     * 是否生产环境
     */
    get isProd(this: Application): boolean {
        return this.config.env === 'prod';
    },

    /**
     * 启动预定义事件
     * @param this 
     */
    onApplicationStart(this: Application) {
        if (!this.isProd) {
            this.on('server', (server: any) => {
                console.log('server restart', server);
            });
        }
    },
};
