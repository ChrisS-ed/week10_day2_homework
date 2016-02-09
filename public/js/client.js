var Location = function(placeName) {
  this.url = 'http://localhost:3000/weather/' + placeName;
  this.data;
}

Location.prototype = {

  get: function(callback) {
    var that = this;
    var request = new XMLHttpRequest();
    request.open('GET', this.url);
    request.onload = function() {
      that.data = JSON.parse(request.responseText);
      callback();
    }
   request.send(null);
  }
}