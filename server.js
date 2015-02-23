var http = require('http')
var app = require('./app')

var server = http.createServer(app)
console.log('Server up')
server.listen(3000);
