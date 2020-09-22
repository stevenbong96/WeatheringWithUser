// Declare global variables
// var cities = ["Seattle", "San Francsico", "Portland", "Los Angeles"];
var cityName = [];
// var addCity = $("#addcity");
let cityInput = $("#citytext");

// Declare the API Key
var APIKey = "9225ddf71ee9bfd143d39d7740347c51";

// showListOfCity(cityName);

// Create list of city
function showListOfCity(createList){
    $("#listcity").empty();

    // Create for loop
    for(i = 0; i < createList.length;i++){
        var cityButton = $("<button>");
        cityButton.text(createList[i]);
        $("#listcity").append(cityButton);
        
    }
}

// Create function to call the ajax function to run the API
function displayWeather(cities){
    // Declare the weather queryURL
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cities + "&appid=" + APIKey;

    // Declare the queryURL
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cities + "&appid=" + APIKey;

    // Call the ajax 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        
        // Create the city name display
        var displayCity = $("#cityname");
        displayCity.text(cities);

        // Display current time
        var currentDate = $("#currenttime");
        currentDate.text(moment().format('L'));

        // Display the weather icon
        // var displayIcon = $("#weathericon");
        // displayIcon.text(response.weather);

        // Create temperature display
        var displayTemp = $("#citytemp");
        var tempFahr = ((response.main.temp) - 273.15) * 1.80 + 32;
        displayTemp.text("Temperature: " + tempFahr.toFixed(0) + " F");

        // Create humidity display
        var displayHumidity = $("#cityhumidity");
        displayHumidity.text("Humidity: " + response.main.humidity + " %");

        // Create wind speed display
        var displayWind = $("#citywind");
        displayWind.text("Wind Speed: " + response.wind.speed + " MPH");

        // Create UV Index display
        // var displayUV = $("<h4>");
        // displayUV.text();
        // displayUV.addClass();
        // $("#cityuv").append(displayUV);
    })

    // Call the AJAX for forecast
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(responseForecast){
        console.log(responseForecast);
        // Create a for loop
        for(j = 0; j < responseForecast.list.length; j+=8){

            // Display city name
            var forecastText = $("#name-" + j);
            forecastText.text(responseForecast.city.name);

            // Display city temperature
            var forecastTemp = $("#temp-" + j);
            var forecastFahr = ((responseForecast.list[j].main.temp) - 273.15) * 1.80 + 32;
            forecastTemp.text("Temperature: " + forecastFahr.toFixed(0) + " F");

            // Display Forecast Humidity
            var forecastHumid = $("#humid-" + j);
            forecastHumid.text("Humidity: " + responseForecast.list[j].main.humidity + " %");

        }
    })

    // Create AJAX for UV Index
    // $.ajax({
    //     url: uvURL,
    //     method: "GET"
    // }).then(function(responseUV){
    //     console.log(responseUV);
    // })

}

// Create function to display the weather data for each city
// function reloadDisplayCity(){
//     // Looping through an array of cities
//     for(i = 0; i < cityName.length; i++){
//         var reDisplay = $("<button>");
//         reDisplay.addClass();
//         reDisplay.attr("",cities[i]);
//         reDisplay.text(cities[i]);
//         $("#citylist").append(reDisplay);
//     }
// }

// local storage function
function saveToLocal(key, value){
    localStorage.setItem(key, value);
}

// Create event listener for user to search their city
$(document).on("click", "button", function(event){
    // To prevent the page refresh itself
    event.preventDefault();
    
    // Grab the input from the text box
    var inputCity = cityInput.val().trim();
    console.log(inputCity);

    // Create if/else conditional statement 
    // if(inputCity === " "){
    //     return
    // }

    // Adding movies to the list
    for(z = 0; z < cityName.length; z++){
        if(cityName[z] === inputCity){
            displayWeather(inputCity);
            return;
        } 
    }

    cityName.push(inputCity);
    displayWeather(inputCity);
    showListOfCity(cityName);

    // Save to local storage
    // saveToLocal(this.id,$(this).val());

    // Call the 
    // reloadDisplayCity();
})

// Call the 
// reloadDisplayCity();
// displayWeather();
