// Declare global variables
var cityName = [];
let cityInput = $("#citytext");

// Declare the API Key
var APIKey = "9225ddf71ee9bfd143d39d7740347c51";

// Create list of city
function showListOfCity(createList){
    var listCity = $("#listcity")
    listCity.empty();
    
    // Create for loop
    for(i = 0; i < createList.length;i++){
        var cityButton = $("<button>");
        cityButton.addClass("list-group-item list-group-item-action btn-block");
        cityButton.text(createList[i]);
        $("#listcity").append(cityButton);
        
    }
}

// Create function to call the ajax function to run the API
function displayWeather(cities){
    // Declare the weather queryURL
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cities + "&appid=" + APIKey;

    // Declare the forecast queryURL
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cities + "&appid=" + APIKey;

    // Call the ajax 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(responseWeather){
        console.log(responseWeather);
        
        // Create the city name display
        var displayCity = $("#cityname");
        displayCity.text(cities);

        // Display current time
        var currentDate = $("#currenttime");
        currentDate.text(moment().format('L'));

        // Display the weather icon
        var displayIcon = $("#weathericon");
        displayIcon.attr("src","https://openweathermap.org/img/w/" + responseWeather.weather[0].icon + ".png");

        // Create temperature display
        var displayTemp = $("#citytemp");
        var tempFahr = ((responseWeather.main.temp) - 273.15) * 1.80 + 32;
        displayTemp.text("Temperature: " + tempFahr.toFixed(0) + " F");

        // Create humidity display
        var displayHumidity = $("#cityhumidity");
        displayHumidity.text("Humidity: " + responseWeather.main.humidity + " %");

        // Create wind speed display
        var displayWind = $("#citywind");
        displayWind.text("Wind Speed: " + responseWeather.wind.speed + " MPH");
        
        // Create variable to call the lat and lon to get the UV Index
        var latitude = responseWeather.coord.lat;
        var longitude = responseWeather.coord.lon;
        
        // Declare the UV Index queryURL
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey;

        // Create AJAX for UV Index
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function(responseUV){
            console.log(responseUV);
            // Create UV Index display
            var displayUV = $("#cityuv");
            displayUV.text("UV Index: " + responseUV.value);
        })
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

            // Create forecast date
            var forecastDate = $("#date-" + j);
            forecastDate.text(responseForecast.list[j].dt_txt);

            // Create forecast icon
            var forecastIcon = $("#icon-" + j);
            forecastIcon.attr("src", "https://openweathermap.org/img/w/" + responseForecast.list[j].weather[0].icon + ".png");

            // Display city temperature
            var forecastTemp = $("#temp-" + j);
            var forecastFahr = ((responseForecast.list[j].main.temp) - 273.15) * 1.80 + 32;
            forecastTemp.text("Temperature: " + forecastFahr.toFixed(0) + " F");

            // Display Forecast Humidity
            var forecastHumid = $("#humid-" + j);
            forecastHumid.text("Humidity: " + responseForecast.list[j].main.humidity + " %");
        }
    })
}

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
