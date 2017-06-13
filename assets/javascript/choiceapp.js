 $(document).ready(function(){
    // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyB8x6QXkmXvA101lRuoB6Raz6yaGn7aBNM",
  //   authDomain: "travelbud-170122.firebaseapp.com",
  //   databaseURL: "https://travelbud-170122.firebaseio.com",
  //   projectId: "travelbud-170122",
  //   storageBucket: "travelbud-170122.appspot.com",
  //   messagingSenderId: "224486984603"
  // };
  // firebase.initializeApp(config);

  // var database = firebase.database();
  
  //Firebase was removed from this because it became unnecessary and was causing errors on pageload when it was inexplicably classified as undefined. I tried a few times to fix it, but then I thought it wasn't really doing anything on this page so I commented it out. 
   
// Moving Carousel
$('.carousel').carousel({
  // padding: 200    
});
  autoplay() 
  function autoplay() {
  $('.carousel').carousel('next');
  setTimeout(autoplay, 4500);
}


  //var ref = database.ref("/citySearches");
  //ref.orderByValue().limitToLast(1).on("child_added", function(snapshot){
  	//var city = snapshot.val().cS;
  	var city = localStorage.getItem("city Search");

  	console.log(city);

   
  	 $.ajax({
   
  url : "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + ",US&APPID=94759cb6678685b518968236d922ade6&units=imperial&count=7",
  method : "GET",
  }).done(function(response){ 
    var day1 = response.list[0].dt;
    var day1F = moment().calendar(day1);
    var day1C = moment().format("dddd, MMM Do");
    var day2a = moment().add(1, "day");
    var day2ab = moment(day2a).format("dddd, MMM Do");
    var day3a = moment().add(2, "day");
    var day3ab = moment(day3a).format("dddd, MMM Do");
    var day4a = moment().add(3, "day");
    var day4ab = moment(day4a).format("dddd, MMM Do");
    

    //temperatures
    var tempDay = Math.floor(response.list[0].temp.day);
    var icon0 = response.list[0].weather[0].icon;
    var tempDay1 = Math.floor(response.list[1].temp.day);
    var icon1 = response.list[1].weather[0].icon;
    var tempDay2 = Math.floor(response.list[2].temp.day);
    var icon2 = response.list[2].weather[0].icon;
    var tempDay3 = Math.floor(response.list[3].temp.day);
    var icon3 = response.list[3].weather[0].icon;
      console.log(response);
            $("#cityName").html("<div class='center'><p>" + response.city.name + "</p>");
            $("#weather").html("<div class='col s2 offset-s2'>" + day1C +"<p class='icon'>" + tempDay + "°F</p><br><img src='https://openweathermap.org/img/w/"+icon0+".png' style=''display:inline-block></div><div class='col s2'>" + day2ab +"<br><p class='icon'>" + tempDay1 + "°F</p><br><img src='https://openweathermap.org/img/w/"+icon1+".png' style=''display:inline-block></div><div class='col s2'>" + day3ab +"<br><p class='icon'>" + tempDay2 + "°F</p><br><img src='https://openweathermap.org/img/w/"+icon1+".png' style=''display:inline-block></div><div class='col s2'>" + day4ab +"<br><p class='icon'>" + tempDay3 + "°F</p><br><img src='https://openweathermap.org/img/w/"+icon2+".png' style=''display:inline-block></div>");

  });

});
	

if ($("#search").val.length != 0); {
  $("#searchbutton").on("click", function() {
    $("#citysearch").submit();
  });

  $("#citysearch").on("submit", function(event){
    event.preventDefault();
    var city = $("#search").val().trim();
    localStorage.setItem("city Search", city);
    console.log(city);
    




    $.ajax({
  url : "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + ",US&APPID=94759cb6678685b518968236d922ade6&units=imperial&count=7",
  method : "GET",
  }).done(function(response){ 
    var day1 = response.list[0].dt;
    var day1F = moment().calendar(day1);
    var day1C = moment().format("dddd, MMM Do");
    var day2a = moment().add(1, "day");
    var day2ab = moment(day2a).format("dddd, MMM Do");
    var day3a = moment().add(2, "day");
    var day3ab = moment(day3a).format("dddd, MMM Do");
    var day4a = moment().add(3, "day");
    var day4ab = moment(day4a).format("dddd, MMM Do");
    

    //temperatures
    var tempDay = Math.floor(response.list[0].temp.day);
    var icon0 = response.list[0].weather[0].icon;
    var tempDay1 = Math.floor(response.list[1].temp.day);
    var icon1 = response.list[1].weather[0].icon;
    var tempDay2 = Math.floor(response.list[2].temp.day);
    var icon2 = response.list[2].weather[0].icon;
    var tempDay3 = Math.floor(response.list[3].temp.day);
    var icon3 = response.list[3].weather[0].icon;
      console.log(response);
            $("#cityName").html("<div class='center'><p>" + response.city.name + "</p>");
            $("#weather").html("<div class='col s2 offset-s2'>" + day1C +"<br><p class='icon'>" + tempDay + "°F</p><br><img src='https://openweathermap.org/img/w/"+icon0+".png' style=''display:inline-block></div><div class='col s2'>" + day2ab +"<br><p class='icon'>" + tempDay1 + "°F</p><br><img src='https://openweathermap.org/img/w/"+icon1+".png' style=''display:inline-block></div><div class='col s2'>" + day3ab +"<br><p class='icon'>" + tempDay2 + "°F</p><br><img src='https://openweathermap.org/img/w/"+icon1+".png' style=''display:inline-block></div><div class='col s2'>" + day4ab +"<br><p class='icon'>" + tempDay3 + "°F</p><br><img src='https://openweathermap.org/img/w/"+icon2+".png' style=''display:inline-block></div>");
 });


  });
};

  