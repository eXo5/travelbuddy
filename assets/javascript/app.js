$(document).ready(function($) {
//currently no script loads on page load
});

//global vars
var citySearch = $("#city_search").val().trim(); //.val() for the main search bar

$("#search-button").on("click", function(e){ 
	event.preventDefault();
  window.open("choice.html", "_parent");
	var citySearch = $("#city_search").val().trim();
  $("#city_search").html(" ");
	console.log(citySearch);
  //var queryURL = "http://api.wunderground.com/api/c439c17826acb423/geolookup/conditions/q/" + stateID + "/" + city
  $.ajax({
  url : "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + ",US&APPID=94759cb6678685b518968236d922ade6&units=imperial",
  method : "GET",
  }).done(function(response){ 
      console.log(response)});
      $("#city_name").html(citySearch);
  })
 
$('#city_name');