
/* -----------------------------------------------*/
/*												  */
/*		 This program works as follows			  */
/*	1. Gets an input (city) from the search jquery*/
/*     call.									  */
/*  2. Search input (city name) gets sent into    */
/*     getCityId funciton to get the cities ID    */
/*  3. It is then sent into searchByDestId in     */
/*     order to seperate out the attractions from */
/*     the hotels or restaurants, gets individual */
/*     attraction ID and calls moreVenues with    */
/*     that ID and gets the information there.    */
/*											      */
/* ---------------------------------------------- */

/*this function is called from within the for loop of
searchByDestId.
The info passed into it is the venue ID for the events
that are categorized as "attractions". No loops are used 
since it is called inside another loop.*/

//count used to limit results to 10

$(document).ready(function(){
	// on page load the city is retrieved from the localStorage and function getCityID is ran.
	var city = localStorage.getItem("city Search");
	getCityID(city);
	//at the bottom of this file, there's an event listener for a form submit that gets the input from the text-area of the form.
	var count = 0;
	var createRow = "";
	var createCol ="";
	var name = "";
	var titleName= "";

	function moreVenues(vId, counter){

		var queryURL = "https://api.tripexpert.com/v1/venues/"+vId+"?&api_key=16f4b9a0eaabb835e60aa42e89c48e11";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(data){

			var path = data.response.venues[0];

			//console.log(data);
			
			console.log("TITLE: " + titleName);
			//name of attraction
			console.log(path.name);	
			console.log("HERE! " + count);
			$("#column"+(counter-1)).append("<h2>"+path.name+"</h2>");
			$("#column"+(counter-1)).append("<br>");
			//address					
			console.log(path.address);
			$("#column"+(counter-1)).append(path.address);
			$("#column"+(counter-1)).append("<br>");
			//open hours
			// console.log(path.opening_hours);
			// $("#column"+(counter-1)).append(path.opening_hours);
			// $("#column"+(counter-1)).append("<br>");
			//review 1
			console.log("Review 1: " + path.reviews[0].extract);
			$("#column"+(counter-1)).append("<b>Review: </b>"+path.reviews[0].extract);
			$("#column"+(counter-1)).append("<br>");
			//review 2
			// console.log("Review 2: " + path.reviews[1].extract);
			// $("#column").append("<b>Review: </b>"+path.reviews[1].extract);
			// $("#column").append("<br>");
			//phone number
			console.log(path.telephone);
			if(path.telephone!=null){
				$("#column"+(counter-1)).append(path.telephone);
				$("#column"+(counter-1)).append("<br>");
			}
			//website
			console.log(path.website);
			$("#column"+(counter-1)).append("<a id='link' href='" + path.website + "'>More Info</a>");
			$("#column"+(counter-1)).append("<br><br>");
		
		});

	}

	function searchByDestId(dId){
		
		var queryURL = "https://api.tripexpert.com/v1/venues?destination_id=" + dId +"&api_key=16f4b9a0eaabb835e60aa42e89c48e11";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(data){

			var path = data.response;
	
			//console.log(data);

			//traverses entire venues array for all entries of type "attraction" 
			for(var i = 0; i < path.venues.length; i++){

				

				if(path.venues[i].venue_type_id == 1 && count<10){

					createRow = $("<div class='row' id='row"+count+"'></div>");

					$("#main").append(createRow);

					createCol = $("<div class='col s6' id='column"+count+"'></div>");

					$("#row"+count).append(createCol);
					//count used to make sure we only get the top ten results
					count++;

					//call this function if the id=3 aka is an attraction 
					moreVenues(path.venues[i].id,count);
					
				}

			}

			count=0;
			//console.log(data);
			
		});

	}

	//this function uses the API to extract the ID of the city
	function getCityID(city){

		var queryURL = "https://api.tripexpert.com/v1/destinations?&api_key=16f4b9a0eaabb835e60aa42e89c48e11";
		var id = "";
		var name = city;
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(data){

			
			
			/*This for loop goes into the api objects array and matches the city from the input
			and then saves the ID number from that location in the object array*/

			for(var i = 0; i<data.response.venues.length;i++){

				if(data.response.venues[i].name.toLowerCase() == city.toLowerCase()){
					//this is where the city ID is stored
					titleName =  data.response.venues[i].name;
					console.log(titleName);

					id = data.response.venues[i].id;
					//console.log("ID: " + id);

				}

			}
			//takes the id we found and passes it to the searchById function
			searchByDestId(id);

		});

	}


	//gets the input from the search bar 
	$("#searchbutton").on("click", function(event){
		$("#column").remove();
		$("#link").remove();
		$("#row0").remove();
		$("#row1").remove();
		$("#row2").remove();
		$("#row3").remove();
		$("#row4").remove();
		$("#row5").remove();
		$("#row6").remove();
		$("#row7").remove();
		$("#row8").remove();
		$("#row9").remove();

		
		event.preventDefault();
		var city = $("#search").val().trim();
		getCityID(city);
		localStorage.setItem("city Search", city);

	});

	$("#citysearch").on("submit", function() {
		$("#column").remove();
		$("#link").remove();
		$("#row0").remove();
		$("#row1").remove();
		$("#row2").remove();
		$("#row3").remove();
		$("#row4").remove();
		$("#row5").remove();
		$("#row6").remove();
		$("#row7").remove();
		$("#row8").remove();
		$("#row9").remove();

		event.preventDefault();
		var city = $("#search").val().trim();
		localStorage.setItem("city Search", city);
		getCityID(city);
	})

})
