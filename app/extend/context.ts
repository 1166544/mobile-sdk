import { Context } from 'egg';

/**
 * Context扩展
 */
class ContextExtender {
    
    constructor() {
        // hole
    }

    /**
     * 判断是否为AJAX请求
     * @param this 
     */
    public isAjax(this: Context) {
        return this.get('X-Requested-With') === 'XMLHttpRequest';
    }

}
export default new ContextExtender();
