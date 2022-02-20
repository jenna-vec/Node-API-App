var inquirer = require('inquirer');
var request = require('request');
const yelp = require('yelp-fusion');
const client = yelp.client('ERiFD3uG9qV2tKyuXTXCCATBZJ1W3DBOb_E7YGX0JvkoB71VFpY6ZZzzaQ94061YKnRSZHs-cH4FjdkErPMB2egCkbhE_5qvSPsB6t8O0abrPx2fmw2pEcCLKq77X3Yx');
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
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyAuaOzywIAyxE7grRq9m26XrHm_MZTAi8E";
      
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
    key: 'AIzaSyAb__tO6lXctp3X5v-tTmKioyUsF2OjCwQ'
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