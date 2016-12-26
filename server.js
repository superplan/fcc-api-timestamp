var express = require('express')
var app = express()
var myPort = process.env.PORT;
var myHost = process.env.IP;

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(myPort, function () {
  console.log('Example app listening on port '+myPort+'!');
})