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

$(document).ready(function(){
	var city = localStorage.getItem("city Search");
	getCityID(city);
});

var name = "";

function moreVenues(vId){

	var queryURL = "https://api.tripexpert.com/v1/venues/"+vId+"?&api_key=16f4b9a0eaabb835e60aa42e89c48e11";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(data){

		var path = data.response.venues[0];

		console.log(data);
		//name of attraction
		console.log(path.name);	
		$("#column").append("<h2>"+path.name+"</h2>");
		$("#column").append("<br>");
		//address					
		console.log(path.address);
		$("#column").append(path.address);
		$("#column").append("<br>");
		//open hours
		console.log(path.opening_hours);
		$("#column").append(path.opening_hours);
		$("#column").append("<br>");
		//review 1
		console.log("Review 1: " + path.reviews[0].extract);
		$("#column").append("<b>Review: </b>"+path.reviews[0].extract);
		$("#column").append("<br>");
		//review 2
		// console.log("Review 2: " + path.reviews[1].extract);
		// $("#column").append("<b>Review: </b>"+path.reviews[1].extract);
		// $("#column").append("<br>");
		//phone number
		console.log(path.telephone);
		$("#column").append(path.telephone);
		$("#column").append("<br>");
		//website
		console.log(path.website);
		$("#column").append("<a id='link' href='" + path.website + "'>More Info</a>");
		$("#column").append("<br><br>");
	
	});

}

function searchByDestId(dId){
	
	var queryURL = "https://api.tripexpert.com/v1/venues?destination_id=" + dId +"&api_key=16f4b9a0eaabb835e60aa42e89c48e11";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(data){

		var path = data.response;
		//count used to limit results to 10
		var count = 0;



		var createRow = $("<div class='row' id></div>");

		$("#displayAPI").append(createRow);

		var createCol = $("<div class='col s12 m6 l6 pull-m1' id='column'></div>");

		var createCol2 = $("<div class='col s12 m5 l5 push-m1' id='mapBox'><p>This is a box for a potential map</p></div>");

		$(".row").append(createCol);
		$(".row").append(createCol2);

		//traverses entire venues array for all entries of type "attraction" 
		for(var i = 0; i < path.venues.length; i++){

			if(path.venues[i].venue_type_id == 3 && count<10){
				//count used to make sure we only get the top ten results
				count++;

				//console.log("HERE: " +path.venues[i].id);

				//call this function if the id=3 aka is an attraction 
				moreVenues(path.venues[i].id);
				
			}
		}

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
				id = data.response.venues[i].id;
				//console.log("ID: " + id);
			}
		}
		//takes the id we found and passes it to the searchById function
		searchByDestId(id);

	});
}

//gets the input from the search bar 
$("#search").on("click", function(event){
	$("#column").remove();
	$("#link").remove();
	$(".row").remove();
	event.preventDefault();
	var city = $("#city-input").val().trim();
	getCityID(city);

});



