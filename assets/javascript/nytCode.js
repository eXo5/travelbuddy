

$(document).ready(function(){
// on page load the city is retrieved from the localStorage and function getCityID is ran.
var location = localStorage.getItem("city Search");


var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// These variables will hold the results we get from the user's inputs via HTML

var numResults = 0;
var startYear = 0;
var endYear = 0;
var switcher=false;
var initialSearch = "";
var createRow = "";
var createCol = "";

// queryURLBase is the start of our API endpoint. The searchTerm will be appended to this when
// the user hits the search button
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=";

// Counter to keep track of article numbers as they come in
var articleCounter = 0;

function printArticles(path, articleCounter){

    $("#column"+(articleCounter-1)).append("<h2><a href="+path.web_url+" target='_blank'>"+path.headline.main+"</a></h2>");


    $("#column"+(articleCounter-1)).append("<p>"+path.byline.original+"</p>");
  

    $("#column"+(articleCounter-1)).append("<p>"+path.pub_date+"</p>");
   

    $("#column"+(articleCounter-1)).append("<p>"+path.snippet+"</p>");


    //$("#column"+(articleCounter-1)).append("<img src='"+path.multimedia[0].legacy.thumbnail+"' alt='nyt_image>");

    
}

function runQuery(numArticles, queryURL) {

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(NYTData) {

        
    
        // Loop through and provide the correct number of articles
        for (var i = 0; i < numArticles; i++) {

            var path = NYTData.response.docs[i];
            console.log(NYTData);
            createRow = $("<div class='row' id='row"+articleCounter+"'></div>");
            //append rows (0-9) to main
            $("#main").append(createRow);
            //create column(0-9)
            createCol = $("<div class='col s8' id='column"+articleCounter+"'></div>");
            //append row to column
            $("#row"+articleCounter).append(createCol);

            // Add to the Article Counter (to make sure we show the right number)
            articleCounter++;

            printArticles(path,articleCounter);

        }

    });

}


function getCityID(city){

    var url1 = "https://api.tripexpert.com/v1/destinations?&api_key=16f4b9a0eaabb835e60aa42e89c48e11";

    $.ajax({
        url: url1,
        method: "GET"
    }).done(function(data){

        /*This for loop goes into the api objects array and matches the city from the input
        and then saves the ID number from that location in the object array*/
        console.log(data);
        for(var i = 0; i<data.response.venues.length; i++){

            if(data.response.venues[i].name.toLowerCase() == city.toLowerCase()){
                //this is where the city ID is stored
                switcher = true;
                console.log(switcher);
            }
        }

        if(switcher==true){
            runQuery(numResults, initialSearch);
            console.log("YAY!!!");

        }
        else{
            console.log("ERROR!!!!!!!");
        }

    });

}

function starter(place){

    // $(".col s8").remove();
    // $("#link").remove();
    // $(".row").remove();
    switcher = false;
    // Initially sets the articleCounter to 0
    articleCounter = 0;

    initialSearch = queryURLBase + place;
    // Number of results the user would like displayed
    numResults = 10;
    console.log("hi!");
    getCityID(place);

}

starter(location);

});
