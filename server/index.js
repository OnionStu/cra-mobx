var express = require('express'),
  Proxy = require('./proxy'),
  path = require('path')
var app = express()
var packageJSON = require('../package.json')

var port = process.env.PORT || 3000

Proxy(app, packageJSON.proxy)
app.use('', express.static(path.resolve(__dirname, '../build')))

app.get('*', function(request, response) {
  console.log('%s %s', request.method, request.url)
  response.sendFile(path.resolve(__dirname, '../build', 'index.html'))
})

var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port)
  console.log('open http://localhost:%d/', server.address().port)
})
