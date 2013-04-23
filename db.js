var mongodb = require('mongodb')
var winston = require('winston')

var server = new mongodb.Server("home", 27017, {});
var client = new mongodb.Db('touchthat', server)
client.open(function(err) {
  if(err) {
    throw err
  }
})

module.exports = client
