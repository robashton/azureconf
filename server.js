var express = require('express')
  , stylus = require('stylus')

var app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(stylus.middleware({
  src: __dirname + '/site'
}))
app.use(express.static(__dirname + '/site'))

app.listen(process.env.PORT || 8003 )

app.get('/', function(req, res) {
  res.render('index')
})
