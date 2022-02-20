var inquirer = require('inquirer');
var request = require('request');
const yelp = require('yelp-fusion');
const client = yelp.client(YELP_API_KEY);
var search = require('youtube-search');

if(process.argv[2] === "geocoder"){
    inquirer.prompt([
        {
          type: "input",
          message: "Location",
          name: "location"
        },
      ]).then(function(answers){
      
        var location = answers.location
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + GOOGLE_API_KEY;
      
        request(url, function(error, response) {
      
          if(!error){
      
          result = JSON.parse(response.body)
          console.log("Location: " + result.results[0].formatted_address);
          console.log("Latitude: " + result.results[0].geometry.location.lat)
          console.log("Longitude: " + result.results[0].geometry.location.lng)
      
          }
      
          else {
            console.log("There is an error.")
          }
      
        })
      
      });
}

if(process.argv[2] === "yelp"){
    'use strict';

    inquirer.prompt([
        {
        type: "input",
        message: "Location",
        name: "location"
        },
        {
            type: "input",
            message: "Type of Food",
            name: "food"
        },
    ]).then(function(answers){
    
        var area = answers.location;
        var food = answers.food;

        client.search({
            term: food,
            location: area,
        }).then(response => {
            console.log("    ")
            for (var i = 0; i < 5; i++) {
                console.log("----- Yelp Search Result " + (i+1) + " -----")
                console.log("Name: " + response.jsonBody.businesses[i].name);
                console.log("Rating: " + response.jsonBody.businesses[i].rating);
                console.log("Price: " + response.jsonBody.businesses[i].price);
                console.log("Phone: " + response.jsonBody.businesses[i].phone);
                console.log("  ")
            }
        })
    });
}

if(process.argv[2] === "youtube"){
    
    var searchTerm = process.argv.slice(3).join(' ');
    
    var opts = {
    maxResults: 5,
    key: YOUTUBE_API_KEY
    };
    
    search(searchTerm, opts, function(err, results) {
    if(err) return console.log(err);
    
    console.log("    ")

    for (i = 0; i < results.length; i++) {
        console.log("----- YouTube Search Result " + (i+1) + " -----")
        console.log("Title: " + results[i].title);
        console.log("Visit: " + results[i].link);
        console.log("  ")

    }
    });
}
