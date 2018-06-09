'use strict';

/**
 * 自定义JQ插入免打包插件
 * @param {*} options 
 */
function HtmlWebpackCommonLibsPlugin (options) {
  this.options = options || {};
}

HtmlWebpackCommonLibsPlugin.prototype.apply = function (compiler) {
  const paths = this.options.paths;

  if (compiler.hooks) {
    // webpack 4 support
    compiler.hooks.compilation.tap('HtmlWebpackCommonLibsPlugin', function (compilation) {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('HtmlWebpackCommonLibsPlugin', function (htmlPluginData, callback) {
        for (let i = paths.length - 1; i >= 0; i--) {
            htmlPluginData.assets.js.unshift(paths[i]);
        }
        callback(null, htmlPluginData);
      });
    });
  } 
};

module.exports = HtmlWebpackCommonLibsPlugin;