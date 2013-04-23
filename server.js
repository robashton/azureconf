var express = require('express')

var app = express()

app.listen(process.env.PORT || 8003)

app.get('/', function(req, res) {
  res.send('hello world')
})
