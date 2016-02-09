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

window.onload = function() {

  var form = document.querySelector('#locationSearch');
  var input = document.querySelector('#locationInput');
  var locationView = document.querySelector('#locationDisplay');
  var storedLocationsView = document.querySelector('#storedLocations');

  var locations = JSON.parse( localStorage.getItem('weather') ) || [];

  var displayLocations = function() {
    storedLocationsView.innerHTML = '';

  //   for (book in books) {
  //     var data = books[book];
  //     var li = document.createElement('li');
  //     li.innerHTML = "<img src='" + data.cover.small + "'>" + data.title + '<button class="removeBook" data-id="' + book + '">Remove Book</button>';
  //     storedBooksView.appendChild(li);
  //   }

  }

  form.onsubmit = function(event) {
    event.preventDefault();
    var location = input.value;
    var currentLocation = new Location(location)

    currentLocation.get(function() {
      var data = currentLocation.data;

      console.log(data.weather[0].main);

      // var locationDisplay = "<h4>" + data.title + "</h4><img src='"+ data.cover.large + "'><button id='addBook'>Add to list</button>";
      var locationDisplay = "<h4>Location: " + data.name + ", Current weather: " + data.weather[0].main + "</h4>";
      locationView.innerHTML = locationDisplay;

      // document.querySelector('#addBook').onclick = function() {
      //   books.push(data);
      //   localStorage.setItem('books', JSON.stringify(books));
      //   displayBooks();
      // }
    })

  }

}