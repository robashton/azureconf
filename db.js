var mongodb = require('mongodb')

var server = new mongodb.Server("137.117.8.96", 27017, {});
var client = new mongodb.Db('touchthat', server)
client.open(function(err) {
  if(err) {
    console.log(err)
  }
})

module.exports = client
