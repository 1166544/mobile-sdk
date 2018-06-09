// 导入公共样式
import '../../../styles/common/css/style.css';

// 导入当前页面样式
import './index.scss';

// 当前页面逻辑
export default class TestIndex {
    constructor() {
        addEventListener('load', () => {
            setTimeout(this.hideURLbar, 0); 
        }, false);
    }

    public hideURLbar(): void { 
        scrollTo(0, 1);    
    }
}
