const pluginsConfig = require("./build/webpack.plguins");
const rulesConfig = require("./build/webpack.rules");
const entryConfig = require("./build/webpack.entry");
const outputConfig = require("./build/webpack.output");
const resolveConfig = require("./build/webpack.resolve");
const performanceConfig = require("./build/webpack.performance");
const optimiziationConfig = require("./build/webpack.optimization");

/**
 * 基础配置
 */
module.exports = {

    // 入口
    entry: entryConfig.getConfig('client/view/**/*.ts'),

    // 输出JS文件位置
    output: outputConfig.getConfig(),

    // 插件配置
    plugins: pluginsConfig.getConfig(),

    // 打包规则
    module: rulesConfig.getConfig(),

    // 处理文件类型
    resolve: resolveConfig.getConfig(),

    // 改进项
    performance: performanceConfig.getConfig(),

    // 提取js规则
    optimization: optimiziationConfig.getConfig(),
};
