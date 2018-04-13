var proxy = require('http-proxy-middleware')

module.exports = function(app, proxies) {
  for (path in proxies) {
    app.use(path, proxy(proxies[path]))
  }
}
