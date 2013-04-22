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
      
      - npm install mongodb
      - let's create an endpoint

      - Show manual validation first
      - Pull in node-validator (npm install validator)
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

```

  





