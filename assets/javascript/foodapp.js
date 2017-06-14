$(document).ready(function() {

	var cities = [];
	var globalDetails = "";
	var city = localStorage.getItem("city Search");
	cities.push(city);

	getCityID(city);

	function getCityID(city){
		var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + city + "&apikey=68794916a5d408b51d693e400ac0bc7c";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){
			//console.log(response);

			var cityID = response.location_suggestions[0].id;
			//console.log(cityID);
	
			searchByID(cityID);
		});
	}

	function searchByID(cityID){

		$(".details1").remove();
		$(".details2").remove();
		$(".details3").remove();
		$(".details4").remove();
		$(".details5").remove();
		$(".details6").remove();
		$(".details7").remove();
		$(".details8").remove();
		$(".details9").remove();
		$(".details10").remove();

		var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityID + "&entity_type=city&sort=rating&count=10&apikey=68794916a5d408b51d693e400ac0bc7c";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){
			console.log(response);

			//prints 5 restaurants
			for(var i=0; i<10; i++){

				var details = response.restaurants[i].restaurant;

				//variable used to make sevearl different classes with different numbers
				var x = i+1;
				//number displayed on screen 
				var result = "" + (i+1) + ".";
			
				var name = $("<h4 class='rName'>" + details.name + "</h4>");
				var cuisine = $('<p class="font-small"> Cuisine: ' + details.cuisines + '</p>');
				var addr = $('<p class="font-small">' + details.location.address + '</p>');
				var cityName = $('<p class="font-small"> City: ' + details.location.city + '</p>');
				
				var photo = $("<img src="+ details.thumb+" class='rName'>");
				var rating = $("<p class='font-small'> Rating: " + details.user_rating.aggregate_rating + "</p>");
				//links
				var menu = $('<a class="link" href='+details.menu_url+'>Menu</a><br>');
				var website = $('<a class="link" href='+details.url+'>More info on Zomato!</a>');

				photo.addClass("pic");

				var div = $("<div class=details"+x+"></div>");

				$(".divContainer").append(div);
				$(".details"+x).append(photo).append(name).append(cuisine).append(addr).append(rating).append(menu).append(website);
				// $(".title").html("Top Ten Places to Eat in "+ details.location.city);
			}
			
		});
	}	

	
		$("#searchbutton").on("click", function(event){
			event.preventDefault();
			var city = $("#search").val().trim();
			cities.push(city);
			getCityID(city);
			localStorage.setItem("city Search", city);
		});

		$("#citysearch").on("submit", function(){
			event.preventDefault();
			var city = $("#search").val().trim();
			cities.push(city);
			getCityID(city);
			localStorage.setItem("city Search", city);
		})



	
})
	