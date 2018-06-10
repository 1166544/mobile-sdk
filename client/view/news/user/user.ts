// 导入公共样式
import '../../../styles/css/global.css';
import '../../../styles/css/global.less';
import '../../../styles/css/global.scss';

// 导入其它模块逻辑
import GlobalLogical from '../../../components/global';

// 实例化全局对像
const global: GlobalLogical = new GlobalLogical();

console.log(global.a);
console.log(global.b);
