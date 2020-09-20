// Declare global variables
var cityName = "";
var stateCode = "";

// Declare the elementbyId

// Declare the API Key
var APIKey = "9225ddf71ee9bfd143d39d7740347c51";

// Declare the querURL
var querURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + stateCode + "&appid=" + APIKey;

// Call the ajax function to run the API
$.ajax({
    url: querURL,
    method: "GET"
}).then(function(response){
    console.log(response);
})