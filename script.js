// Declare global variables
// var cities = ["Seattle", "San Francsico", "Portland", "Los Angeles"];
var cityName = "San Francisco";
var addCity = $("#addcity");

// Declare the API Key
var APIKey = "9225ddf71ee9bfd143d39d7740347c51";

// Declare the queryURL
var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + APIKey;

// Create list of city
function showListOfCity(createList){
    $("#listcity").empty();

    var list = $("#textarea");

    // Create for loop
    for(i = 0; i < list.length;i++){
        var cityList = $("<button>");
        cityList.addClass();
    }
}

// Create function to call the ajax function to run the API
function displayWeather(){
    // Grab the value from the textarea
    // var inputCity = $("#citytext").val().trim();

    // Declare the weather queryURL
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

    // Call the ajax 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        
        // Create the city name display
        var displayCity = $("<h2>");
        displayCity.text(cityName);
        $("#cityname").append(displayCity);

        // Display current time
        var currentDate = $("<h4>");
        currentDate.text(moment().format('L'));
        $("#currenttime").append(currentDate);

        // Display the weather icon
        var displayIcon = $("#weathericon");
        displayIcon.text(response.weather);

        // Create temperature display
        var displayTemp = $("<h4>");
        var tempFahr = ((response.main.temp) - 273.15) * 1.80 + 32;
        displayTemp.text("Temperature: " + tempFahr.toFixed(0) + " F");
        $("#citytemp").append(displayTemp);

        // Create humidity display
        var displayHumidity = $("<h4>");
        displayHumidity.text("Humidity: " + response.main.humidity);
        $("#cityhumidity").append(displayHumidity);

        // Create wind speed display
        var displayWind = $("<h4>");
        displayWind.text("Wind Speed: " + response.wind.speed);
        $("#citywind").append(displayWind);

        // Create UV Index display
        var displayUV = $("<h4>");
        displayUV.text();
        displayUV.addClass();
        $("#cityuv").append(displayUV);
    })

    // Call the AJAX for forecast
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(responseForecast){
        console.log(forecastURL);
    })
}

// Create function to display the weather data for each city
function reloadDisplayCity(){
    // // Looping through an array of cities
    // for(i = 0; i < cityName.length; i++){
    //     var reDisplay = $("<button>");
    //     reDisplay.addClass();
    //     reDisplay.attr("",cities[i]);
    //     reDisplay.text(cities[i]);
    //     $("#citylist").append(reDisplay);
    // }
}

// local storage function
function saveToLocal(key, value){
    localStorage.setItem(key, value);
}

// Create event listener for user to search their city
addCity.on("click", "button", function(event){
    // To prevent the page refresh itself
    event.preventDefault();

    // Grab the input from the text box
    var inputCity = $("#textarea").val().trim();

    // Create if/else conditional statement 
    if(inputCity === " "){
        return
    }

    // Adding movies to the list
    cityName.push(listMovies);

    // Save to local storage
    saveToLocal(this.id,$(this).val());

    // Call the 
    reloadDisplayCity();
})

// Call the 
reloadDisplayCity();
displayWeather();
