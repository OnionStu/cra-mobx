const { injectBabelPlugin } = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less-modules')

const theme = require('./theme')()
// read more -> https://github.com/timarney/react-app-rewired

module.exports = function override(config, env) {
  // 注入 类 属性
  config = injectBabelPlugin('transform-class-properties', config)
  // 注入 修饰器
  config = injectBabelPlugin('transform-decorators-legacy', config)
  // 注入 import 插件 ，antd 会按需引入 对应组件及样式
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDriectory: 'es', style: true }],
    config
  )
  config = rewireLess.withLoaderOptions({
    // antd 的自定义主题
    modifyVars: theme,
    // 在less 3.x 以上版本 没有设置这项会报错… 'Inline JavaScript is not enabled. Is it set in your options?'
    javascriptEnabled: true
  })(config, env)
  return config
}
