var express = require('express');
var app = express();

var http = require('http');

app.get('/weather', function(req, res) {
  res.send('Hello World!') 
});

app.get('/weather/:location', function(request, response) {

  http.get('http://api.openweathermap.org/data/2.5/weather?q='+ request.params.location + ',uk&appid=189fc4ee7a86db7e329457b7dd90de1d', function(res) {

    var body = '';
    res.on('data', function(d){
      body += d;
    });

    res.on('end', function() {
      var allData = JSON.parse(body)
      response.send(allData);
    })

  })

});

// http://api.openweathermap.org/data/2.5/weather?q=Edinburgh,uk&appid=189fc4ee7a86db7e329457b7dd90de1d


app.listen('3000', function() {
  console.log('Serving on port 3000')
});