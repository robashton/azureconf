var express = require('express')

var app = express()

app.listen(8003)

app.get('/', function(req, res) {
  res.send('hello world')
})
