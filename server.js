//Get packages
var express = require('express');
var morgan = require("morgan");
var chrono = require("chrono-node");

// Invoke App
var app = express();

//Logger
app.use(morgan('dev'));

//Global variables
var myPort = process.env.PORT;
// var myHost = process.env.IP;

app.get('/:input', function (req, res) {
  
  //Initialize variables
  var output = {"unix": null, "natural": null};
  var argIsInt = isInt(req.params.input);
  var argIsStr = isStr(req.params.input);
  
  //Input date to unix format
  if (argIsInt){
    // Handle integer input
    output.unix = argIsInt;
  } else if (argIsStr){
    //Handle non integer input
    output.unix = argIsStr;
  }
  
  //Unix date to natural format
  output.natural = naturalFormat(output.unix);
  
  //Write response
  console.log(output);
  res.send(output);
});

app.listen(myPort, function () {
  console.log('Example app listening on port '+myPort+'!');
});


/*
 * Functions
 */
function naturalFormat(unixForm){
  if (unixForm === null) return null;
  else {
    var natDate = new Date(unixForm * 1000);
    return natDate.toLocaleString("en-us", { month: "long" }) + " " + natDate.getDate() + ", " + natDate.getFullYear();
  }
}

function isInt(input){
  var regNumbersOnly = new RegExp('^[0-9]+$');
  if (regNumbersOnly.test(input)) return parseInt(input,10);
  else return false;
}

function isStr(input){
  var date = chrono.parseDate(input);
  if (date === null)  return false;
  else {
    //Unix date in seconds minus 12 hours, since chrono sets the default time
    //to midday (and we want midnight)
    var dateUnix = new Date(date)/1000 - 43200;
    return dateUnix;
  }
}