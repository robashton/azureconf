var mongodb = require('mongodb')

var server = new mongodb.Server("100.68.124.6", 27017, {});
var client = new mongodb.Db('touchthat', server)
client.open(function(err) {
  if(err) {

  }
})

module.exports = client
