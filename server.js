var express = require('express')
  , stylus = require('stylus')
  , validator = require('express-validator')
  , winston = require('winston')
 
require('winston-skywriter')

var app = express()
setupExpressModules(app)

require('./routes')(app)

app.use(function(err, req, res, next) {
  winston.error(err.toString(), err.stack, err)
  res.send(500, "generic error response")
})

app.listen(process.env.PORT || 8003 )

function setupExpressModules(app) {
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  app.use(stylus.middleware({
    src: __dirname + '/site'
  }))
  app.use(express.static(__dirname + '/site'))
  app.use(express.methodOverride())
  app.use(express.bodyParser())
  app.use(validator)
}

winston.add(winston.transports.Skywriter, {
  account: 'azureconftable',
  key: 'mikvx5cwxuxvumkiedk0x1c8g2opkcu5bbbmkeh+dl1n7xtsk17qordapsrxnnjcbae6p3atp62eaoi+zgpbbq=='
});


