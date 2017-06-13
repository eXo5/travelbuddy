$(document).ready(function($) {
//currently no script loads on page load

});//end document load function
  // Initialize Firebase project travelBud
  var config = {
    apiKey: "AIzaSyB8x6QXkmXvA101lRuoB6Raz6yaGn7aBNM",
    authDomain: "travelbud-170122.firebaseapp.com",
    databaseURL: "https://travelbud-170122.firebaseio.com",
    projectId: "travelbud-170122",
    storageBucket: "travelbud-170122.appspot.com",
    messagingSenderId: "224486984603"
  };
  firebase.initializeApp(config);

//global vars
var citySearch = $("#city_search").val().trim(); //.val() for the main search bar
var database = firebase.database();


//This is the event.click for the search button.
$("#search-button").on("click", function(e){ 
  event.preventDefault();
  
  var citySearch = $("#city_search").val().trim();

  $("#city_search").html(" ");
  console.log(citySearch);
  //for recent searches
  database.ref("/citySearches").push({
    cS: citySearch
  });

  localStorage.setItem("city Search", citySearch);
  //AJAX FOR OPENWEATHER API that writes a 4 day simple forecast to a div #weather
  // $.ajax({
  // url : "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + citySearch + ",US&APPID=94759cb6678685b518968236d922ade6&units=imperial&count=7",
  // method : "GET",
  // }).done(function(response){ 
  //   var day1 = response.list[0].dt;
  //   var day1F = moment().calendar(day1);
  //   var day1C = moment().format("dddd, MMM Do");
  //   var day2a = moment().add(1, "day");
  //   var day2ab = moment(day2a).format("dddd, MMM Do");
  //   var day3a = moment().add(2, "day");
  //   var day3ab = moment(day3a).format("dddd, MMM Do");
  //   var day4a = moment().add(3, "day");
  //   var day4ab = moment(day4a).format("dddd, MMM Do");
    

  //   //temperatures
  //   var tempDay = Math.floor(response.list[0].temp.day);
  //   var icon0 = response.list[0].weather[0].icon;
  //   var tempDay1 = Math.floor(response.list[1].temp.day);
  //   var icon1 = response.list[1].weather[0].icon;
  //   var tempDay2 = Math.floor(response.list[2].temp.day);
  //   var icon2 = response.list[2].weather[0].icon;
  //   var tempDay3 = Math.floor(response.list[3].temp.day);
  //   var icon3 = response.list[3].weather[0].icon;
  //     console.log(response);
  //     $("#weather").html("<div class='center name'><p>" + citySearch + "</p>");
  //     $("#weather").append("<div class='col s2 offset-s2'>" + day1C +"<br><p class='icon'>" + tempDay + "°F</p><br><img src='https://openweathermap.org/img/w/"+icon0+".png' style=''display:inline-block></div><div class='col s2'>" + day2ab +"<br><p class='icon'>" + tempDay1 + "°F</p><br><img src='https://openweathermap.org/img/w/"+icon1+".png' style=''display:inline-block></div><div class='col s2'>" + day3ab +"<br><p class='icon'>" + tempDay2 + "°F</p><br><img src='https://openweathermap.org/img/w/"+icon1+".png' style=''display:inline-block></div><div class='col s2'>" + day4ab +"<br><p class='icon'>" + tempDay3 + "°F</p><br><img src='https://openweathermap.org/img/w/"+icon2+".png' style=''display:inline-block></div>");

  window.open("choice.html", "_parent");
    });//end AJAX WEATHER function

  //}//end on click for search bar


 
//=======
// });

// =======
// >>>>>>> 1144c6c56c4c1ee2dfd6473a0761e4ab5711e34d
// //global vars
// var citySearch = $("#city_search").val().trim(); //.val() for the main search bar
// var database = firebase.database();


// //This is the event.click for the search button.
// $("#search-button").on("click", function(e){ 
//   event.preventDefault();
  
//   var citySearch = $("#city_search").val().trim();

//   $("#city_search").html(" ");
//   console.log(citySearch);
//   //for recent searches
//   database.ref("/citySearches").push({
//     cS: citySearch
//   });

//   localStorage.setItem("city Search", citySearch);
//   //AJAX FOR OPENWEATHER API that writes a 4 day simple forecast to a div #weather
//   $.ajax({
//   url : "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + citySearch + ",US&APPID=94759cb6678685b518968236d922ade6&units=imperial&count=7",
//   method : "GET",
//   }).done(function(response){ 
//     var day1 = response.list[0].dt;
//     var day1F = moment().calendar(day1);
//     var day1C = moment().format("dddd, MMM Do");
//     var day2a = moment().add(1, "day");
//     var day2ab = moment(day2a).format("dddd, MMM Do");
//     var day3a = moment().add(2, "day");
//     var day3ab = moment(day3a).format("dddd, MMM Do");
//     var day4a = moment().add(3, "day");
//     var day4ab = moment(day4a).format("dddd, MMM Do");
    

//     //temperatures
//     var tempDay = Math.floor(response.list[0].temp.day);
//     var icon0 = response.list[0].weather[0].icon;
//     var tempDay1 = Math.floor(response.list[1].temp.day);
//     var icon1 = response.list[1].weather[0].icon;
//     var tempDay2 = Math.floor(response.list[2].temp.day);
//     var icon2 = response.list[2].weather[0].icon;
//     var tempDay3 = Math.floor(response.list[3].temp.day);
//     var icon3 = response.list[3].weather[0].icon;
//       console.log(response);
//       $("#weather").html("<div class='center name'><p>" + citySearch + "</p>");
//       $("#weather").append("<div class='col s2 offset-s2'>" + day1C +"<br><p class='icon'>" + tempDay + "°F</p><br><img src='https://openweathermap.org/img/w/"+icon0+".png' style=''display:inline-block></div><div class='col s2'>" + day2ab +"<br><p class='icon'>" + tempDay1 + "°F</p><br><img src='https://openweathermap.org/img/w/"+icon1+".png' style=''display:inline-block></div><div class='col s2'>" + day3ab +"<br><p class='icon'>" + tempDay2 + "°F</p><br><img src='https://openweathermap.org/img/w/"+icon1+".png' style=''display:inline-block></div><div class='col s2'>" + day4ab +"<br><p class='icon'>" + tempDay3 + "°F</p><br><img src='https://openweathermap.org/img/w/"+icon2+".png' style=''display:inline-block></div>");

//   window.open("choice.html", "_parent");
//     });//end AJAX WEATHER function

//   })//end on click for search bar


