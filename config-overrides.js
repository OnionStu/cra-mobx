const { injectBabelPlugin } = require('react-app-rewired')
const rewireMobX = require('react-app-rewire-mobx')
const rewireLess = require('react-app-rewire-less')

const theme = require('./theme')()
// read more -> https://github.com/timarney/react-app-rewired

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDriectory: 'es', style: true }],
    config
  )
  config = rewireLess.withLoaderOptions({
    modifyVars: theme
  })(config, env)
  config = rewireMobX(config, env)
  return config
}
