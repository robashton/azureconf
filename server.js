var express = require('express')
  , stylus = require('stylus')
  , validator = require('express-validator')

var app = express()
setupExpressModules(app)

require('./routes')(app)

app.listen(process.env.PORT || 8003 )

function setupExpressModules(app) {
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  app.use(stylus.middleware({
    src: __dirname + '/site'
  }))
  app.use(express.static(__dirname + '/site'))
  app.use(express.bodyParser())
  app.use(validator)
}
