$(document).ready(function() {
  var REQUEST_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson';
  var earthquakeContainer = $('#earthquakeContainer');
  var responses = {
  earthquake: [],  
  firstLoad: false,
  hasError: false
  };
  var template = Handlebars.compile($('#earthquakeTemplate').html());
  $('#getAnotherEarthquake').click(getEarthquake);
  renderEarthquake();

  function getEarthquake() {
    $.get(REQUEST_URL).then(function(resp) {
      responses.earthquake.push(resp);
      responses.hasError = false;
    }).catch(function() {
      responses.hasError = true;
    }).always(function() {
      responses.firstLoad = true;
      renderEarthquake();
    });
  }

  function renderEarthquake() {
    var templateHtml = template(responses);
    earthquakeContainer.empty()
    earthquakeContainer.html(templateHtml);
  }
});