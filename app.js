var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
var http = require('http');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.static('public'));

app.get('/weather', function(req, res) {
  res.render('weather') 
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