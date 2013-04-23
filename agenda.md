- Introduction (slide)
- Who I am (slide)
- An introduction to the demo

  - First thing I ever do is deploy
  - Hello world (not bothering explaining the demo)
  - azure site create --git --location "West US"
  - And look, it's deployed
  - Take a look in the portal to show this 

  - 10 minutes

  - Putting together this game  (write the code from snippets)
    - express


```javascript
      function setupExpressModules(app) {
        app.set('views', __dirname + '/views')
        app.set('view engine', 'jade')
        app.use(stylus.middleware({
          src: __dirname + '/site'
        }))
        app.use(express.static(__dirname + '/site'))
      }
```

    - index.jade

```jade
      extends master

      block head 
        title Hold that space!
        script(type="text/javascript", src="game.js")

      block content
        .hero-unit

          #instructions
            h2 Hold that space!
            p Hold down the space bar for as long as you can!

          #scoring
            h2 
              | Score: 
              span#score

          #result
            h2
              | You scored: 
              span#final-score
                 
            input.btn#btn-submit-score(type="button", value="Submit")
+           input.btn#btn-reset-score(type="button", value="Reset") 

```

    /routes.js

```javascript

    app.get('/', function(req, res) {
      res.render('index')
    })

```

    - master.jade - talk about it

    - style.stylus

```stylus

      #instructions
        display block
      #scoring
        display none
      #result
        display none

      input[type=button]
        margin-right 20px

```

  - and this is the greatest game in the world
  - re-deploy it, talk about npm modules being downloaded

  - 20 minutes

  - How about persisting those scores?

```javascript

~     $.post('/scores', {
+         name: $('#name').val(),
+         score: score
+       },
+       function() {
+         $('#submit-modal').modal('hide')
+     })
    }

```
   

      - npm install mongodb
      - let's create an endpoint

      - Show manual validation first
      - Pull in node-validator (npm install express-validator)
      - Add the code to connect

      /server.js

```javascript

      app.use(validator)
      app.use(express.bodyParser())

```

      /routes.js

```javascript

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
      
      + function isError(req, res) {
      +   var errors = req.validationErrors();
      +   if (errors) {
      +     res.send(errors);
      +     return true;
      +   }
      +   return false;
      + }

      
      var mongodb = require('mongodb')

      var server = new mongodb.Server('127.0.0.1', 27017, {})
      var client = new mongodb.Db('testinstance', server)

      client.open(function(err) {
         if(err) throw err
      
         client.collection("scores", function(err, scores) {
             client.scores = scores
         })
      })

      module.exports = client
~                             

```

db.js

```javascript

    var mongodb = require('mongodb')

    var server = new mongodb.Server("127.0.0.1", 27017, {});
    var client = new mongodb.Db('touchthat', server)
    client.open(function(err) {
      if(err) {
        console.log(err) // woah there
      }
    })

    module.exports = client
      
```

config.js


```javascript
    
    var configs = {
      production: {
        port: process.env.PORT,
        mongoip: "137.117.8.96",
        mongoport: 27017
        mongodb: 'touchthat'
      },
      dev: {
        port: 8003
        mongoip: "127.0.0.1",
        mongoport: 27017
        mongodb: 'touchthat'
      }
    }

    module.exports = {
      
    }

It's just code, so we can do whatever - it's nice to have it centralised though

```

Now, high scores?

We'll need a route

```javascript

    app.get('/highscores', function(req, res) {
      db.collection('scores', function(err, collection) {
        collection.find().sort({score: 1}).limit(10).toArray(function(err, items) {
          res.render('highscores', { scores: items })
        })
      })
    })

```javascript


And we'll need a view

```jade

    extends master

    block head 
      title High scores

    block content
      .hero-unit

        h3 "Hold that space" High scores

        dl.dl-horizontal
          each item in scores
            dt= item.name
            dd= item.score

```

How about logging?

By default, logging is disabled and when enabled data ends up in FTP, blweh

    npm install winston

I use winston for logging, and my default transport during dev is console

```javascript

    app.use(function(err, req, res, next) {
      winston.error(err.toString(), err.stack, err)
      res.send(500, "generic error response")
    })

```

As you can see, by default we'll get this to console but that's useless in Azure, let's log to an azure table instead.

    npm install winston-skywriter

    winston.add(winston.transports.Skywriter, {
      account: 'azureconftable',
      key: 'MIkVX5CwXuxvUmKiEDk0X1c8G2OpKcu5bBbMkeh+dL1n7xtsk17qoRdApsrxnNJCBaE6p3Atp62eAoI+zGpBBQ=='
    });







