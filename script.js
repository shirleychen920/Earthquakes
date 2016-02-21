$(document).ready(function() {
  var REQUEST_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson';
  var earthquakeContainer = $('#earthquakeContainer');
  var responses = {
  earthquake:[],  
  firstLoad: false,
  hasError: false
  };
  var ifUpdate = false;
  var firstTimer = false;

  var template = Handlebars.compile($('#earthquakeTemplate').html());

   $('#getAnotherEarthquake').click(clickUpdate);
    getEarthquake();

    function popalert(){
      alert("It's been one minutue. You can update earthquake info!");
    }
    setTimeout(popalert, 60000);
    setTimeout(afterfirst, 60000);

    function afterfirst(){
      firstTimer = true;
    }

  function clickUpdate(){
    getEarthquake();
    if (!ifUpdate && firstTimer){
      ifUpdate = true;
      setTimeout(popalert, 60000);
      setTimeout(setFalse, 60000);
    }

  }

  function setFalse(){
    ifUpdate = false;
  }
  function timer(){
    if (ifUpdate)
      setTimeout(popalert, 3000);

  }

 
  
  function getEarthquake() {
    $.get(REQUEST_URL).then(function(resp) {
      responses.earthquake.push(resp);
      responses.hasError = false;

    }).catch(function() {
      responses.hasError = true;
    }).always(function() {
      responses.firstLoad = true;
      renderEarthquake();
      responses.earthquake.pop();
    });
  }

  function renderEarthquake() {
    var templateHtml = template(responses);
    earthquakeContainer.html(templateHtml);
  }
});