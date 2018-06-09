// 导入公共样式
import '../../../styles/css/global.css';
import '../../../styles/css/global.less';
import '../../../styles/css/global.scss';

// 导入当前页面样式
import './index.scss';

// 导入其它模块逻辑
import GlobalLogical from '../../../components/global';

// 实例化全局对像
const global: GlobalLogical = new GlobalLogical();

console.log(global.a);
console.log(global.b);

// document.querySelector('div').innerHTML = 'after bundle1';
// $('div').eq(1).css({
//     width: '400px',
//     heihgt: '400px',
// });
