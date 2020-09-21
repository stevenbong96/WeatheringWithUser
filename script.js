// Declare global variables
// var cities = ["Seattle", "San Francsico", "Portland", "Los Angeles"];
// var stateCode = "";
var cityName = "seattle";

// Declare the elementbyId
var addCity = $("#addcity");

// Declare the API Key
var APIKey = "9225ddf71ee9bfd143d39d7740347c51";

// Declare the queryURL
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",&appid=" + APIKey;
var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + APIKey;

// Create function to call the ajax function to run the API
function displayWeather(){
    // Call the ajax 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        // Create div to hold the weather display
        var displayRow = $("<div class='row'>");
        
        // Create the city name display
        var displayCity = $("#cityname");
        displayCity.text(cityName);
        displayCity.addClass("");
        displayRow.append(displayCity);

        // Create temperature display
        var displayTemp = $("#citytemp");
        var tempFahr = ((response.main.temp) - 273.15) * 1.80 + 32;
        displayTemp.text(tempFahr);
        displayTemp.addClass();
        displayRow.append(displayTemp);

        // Create humidity display
        var displayHumidity = $("#cityhumidity");
        displayHumidity.text(response.main.humidity);
        displayHumidity.addClass();
        displayRow.append(displayHumidity);

        // Create wind speed display
        var displayWind = $("#citywind");
        displayWind.text(response.wind.speed);
        displayWind.addClass();
        displayRow.append(displayWind);

        // Create UV Index display
        var displayUV = $("#cityuv");
        displayUV.text();
        displayUV.addClass();
        displayRow.append(displayUV);

        // Putting the entire cities inside the container
        $(".container").append(displayRow);
    })
}

// Create function to display the weather data for each city
function reloadDisplayCity(){
    // Looping through an array of cities
    for(i = 0; i < cityName.length; i++){

    }
}

// Create event listener for user to search their city
addCity.on("click", function(event){
    // To prevent the page refresh itself
    event.preventDefault();

    // Grab the input from the text box
    var listMovies = $("#cityname").val().trim();

    // Adding movies to the list
    cityName.push(listMovies);

    // Call the 
    reloadDisplayCity();
})

// Call the 
reloadDisplayCity();
