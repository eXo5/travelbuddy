

$(document).ready(function(){
    
    /*----------------------------------------*/
    /*                                        */
    /*       NEW YORK TIMES ARTICLES          */
    /*                                        */
    /*----------------------------------------*/


    // on page load the city is retrieved from the localStorage and function getCityID is ran.
    var location = localStorage.getItem("city Search");
    //api key
    var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

    // These variables will hold the results we get from the user's inputs via HTML
    var numResults = 0;
    var startYear = 0;
    var endYear = 0;
    //boolean to keep track 
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

    /*function built to populate our framework */
    function printArticles(path, articleCounter){

        //Create clickable article title that links to NYT article
        $("#column"+(articleCounter-1)).append("<h2><a href="+path.web_url+" target='_blank'>"+path.headline.main+"</a></h2>");
        //conditional that checks for faulty data from the API
        if(path.byline !== null){
            //if we have the info, print the name of the author
            $("#column"+(articleCounter-1)).append("<p>"+path.byline.original+"</p>");
            //print a short summary
            $("#column"+(articleCounter-1)).append("<p>"+path.snippet+"</p>");
        }
    }

    /* function designed to build the initial (empty) framework with secific id's*/
    function runQuery(numArticles, queryURL) {

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(NYTData) {

            /* Loops through and provides the correct number of articles
            while creating rows and columns to populate.*/
            for (var i = 0; i < numArticles; i++) {
                //variable used to shorten code
                var path = NYTData.response.docs[i];

                //console.log(NYTData);

                /*creation or rows and columns here using specific id's*/
                createRow = $("<div class='row' id='row"+articleCounter+"'></div>");
                //append rows (0-9) to main
                $("#main").append(createRow);
                //create column(0-9)
                createCol = $("<div class='col s8' id='column"+articleCounter+"'></div>");
                //append row to column
                $("#row"+articleCounter).append(createCol);

                // Add to the Article Counter (to make sure we show the right number)
                articleCounter++;

                /*after building the framework of rows and columns
                send path and our article counter (incrimenter) into
                a function to print the info */
                printArticles(path,articleCounter);
            }
        });
    }

    /*This function gets an input fromt he usuer and 
    checks that it is indeed a city, gets it's ID and
    then sends our search URL to a runQuery function*/
    function getCityID(city){

        var url1 = "https://api.tripexpert.com/v1/destinations?&api_key=16f4b9a0eaabb835e60aa42e89c48e11";

        $.ajax({
            url: url1,
            method: "GET"
        }).done(function(data){

            /*This for loop goes into the api objects array and matches the city from the input
            and then saves the ID number from that location in the object array*/
            for(var i = 0; i<data.response.venues.length; i++){

                //conditional comparing the data given to us and matching it with the input provided (city name) 
                if(data.response.venues[i].name.toLowerCase() == city.toLowerCase()){
                    //if we find one, we switch on the boolean and exit the for loop 
                    switcher = true;
                    //console.log(switcher);
                }
            }
            //checking the switcher
            if(switcher==true){
                /*if true, send number of results desired (ten) and 
                our initial search value (url with city) into runQuery funciton */
                runQuery(numResults, initialSearch);
            }
            //else, log error to console for check
            else{
                console.log("ERROR!!!!!!!");
            }
        });
    }

    /*starter function where the initial search input is sent*/
    function starter(place){

        //$(".col s8").remove();
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

    //call starter location!
    starter(location);

    /*upon press of search button on page, we remove 
    previously written info and set local storage to 
    new input value (city) and call our starter funciton
    to repopulate the page*/
    $("#searchbutton").on("click", function(event){
        event.preventDefault();

        $(".col s8").remove();
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

        location = $("#search").val().trim();
        //var city = $("#city-input").val().trim();
        localStorage.setItem("city Search", location);
        starter(location);
        
    });

    /*upon press of search button on page, we remove 
    previously written info and set local storage to 
    new input value (city) and call our starter funciton
    to repopulate the page*/
    $("#citysearch").on("submit", function(){
        event.preventDefault();

        $(".col s8").remove();
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

        location = $("#search").val().trim();
        localStorage.setItem("city Search", location);
        starter(location);
        
    });

});


