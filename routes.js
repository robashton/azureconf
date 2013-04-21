var util = require('util')
  , db = require('./db')
  , mongodb = require('mongodb')

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index')
  })

  app.get('/highscores', function(req, res) {
    db.collection('scores', function(err, collection) {
      collection.find().sort({score: -1}).limit(10).toArray(function(err, items) {
        res.render('highscores', { scores: items })
      })
    })
  })

  app.post('/scores', function(req, res) {
    req.check('name').notEmpty()
    req.check('score').isInt()
    if(isError(req, res)) return
    var name = req.body.name
      , score = req.body.score

      db.collection('scores', function(err, collection) {
        collection.insert({ name: name, score: score }, 
          function( err, result ){ 
            if(err)
              res.send({error: err})
            else
              res.send(result[0])
          }
        )
      })
  })

  function isError(req, res) {
    var errors = req.validationErrors();
      if (errors) {
        res.send('There have been validation errors: ' + util.inspect(errors), 500)
        return true
      }
      return false
  }
}
