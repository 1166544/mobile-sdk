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
     * 启动预定义事件
     * @param this 
     */
    onApplicationStart(this: Application) {
        this.on('server', (server: any) => {
            console.log('server restart', server);
        });
    },
};
