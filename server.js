 
//Library for Serial Port
var SerialPort = require("serialport");

var express = require('express');
var path = require('path');
var app = express();

// Define the port to run on
app.set('port', 8080);

app.use(express.static(path.join(__dirname, 'public')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});

//Set up the Serial Port
var port = new SerialPort("/dev/tty.usbmodem1411", { //ttyACM0
  baudRate: 115200,
  parser: SerialPort.parsers.readline("\n")
});



//What Are We Doing? Part 1, Showing RFID on website

//Arduino
//1. Checks if an RFID is identified (4 diff RFID with unique values)
//2. If one of the RFID's is identified, change its boolean to True
//3. Serial.print the boolean value with tag so we can regex it?

//Javascript
//1. Listen to Serial Line for RFID is in, Get UID
//2. For each RFID that is logged in, increase counter 0 - 3
//3. After 4th is logged in (3) do a pop-up that says uber is coming


//1.Listen to the Serial Command Line for the RFID values
//2. If one of the RFID value changes to true, update the corresponding RFID Variable to True
//3. Change the Text of the Div to Say it is Now True

port.on('open', showPortIsOpen);
port.on('data', sendSerialData);
port.on('close', showPortIsClosed);
port.on('error', showError);


//Global Variables
// var results = [];
// var sortedResults = [];
// // var finalResults = [];
var message;
var testMessage = "sup bitch?";
var stock = require('./info.json');
var counter = 0;





//MIDDLEWARE STUFF
app.use('/test', function(req, res) {
    // Do Logging on every request
    console.log('Something is happening.');
    res.json({message:"success bitch"});
});

app.use('/data', function (req, res) {
  console.log("i'm trying");
  res.json(message);
});



//SERIAL STUFF///

//Set Up Our Serial Communications, 4 Functions Needed
function showPortIsOpen() {
  console.log('The port is open. Data rate: ' + port.options.baudRate);
}

function sendSerialData(data) {
console.log(data);
prepareData(data);
}

function showPortIsClosed() {
  console.log('The port is closed.');
}

function showError(error) {
  console.log('Serial Port Error: ' + error);
}

function prepareData(data) {
var dataArray = data.split('\r');
var clipperID;
var clipperLoggedIn = false;

for (item of dataArray) {
var reg = new RegExp('RFID[\\s\\S]','m');

if (reg.test(item)) {
  var tempArray = item.split(":");
  console.log("temp is" + tempArray);
       clipperID = tempArray[1];
       clipperLoggedIn = true;
     } 
}

// console.log("The clipper id is " + clipperID);
if (clipperLoggedIn == true) {
  console.log("YO YO YO YO");
  message = "yes" + "*" + clipperID;
} else {
  message = "no";
}

}
//   var clipperID;
//   var clipperValue;
//   var dataArray = data.split('\r');  
//   var rfidLoggedIn = false;

//   console.log("array 0  is " + dataArray[0]);
//     console.log("array 1  is " + dataArray[1]);


//   for (item of dataArray) {
//     var reg = new RegExp('RFID[\\s\\S]','m');
//     var reg2 = new RegExp('value[\\s\\S]', 'm');
//     if (reg.test(item)) {
//       clipperId = item;
//     }

//     if (reg2.test(item)) {
//       clipperValue = item;
//     }
//   }

// console.log("Id is" + clipperID);
// console.log("Fare Value is " + clipperValue);


  //Get the ID & Value from Card
// console.log("array is" + dataArray);
// for (var i=0;i<dataArray.length;i++) {
//   clipperID = dataArray[0];
//   clipperValue = dataArray[1];
// }
// console.log("The clipper id is " + clipperID);
// console.log("The clipper value is " + clipperValue);

// }




// function prepareData(data){
// var result;
// var dataArray = data.split('\r');
//   for (item of dataArray) {
//     var reg = new RegExp('RFID[\\s\\S]','m');
//     if (reg.test(item)){
//       result = item;
//    }
//  }
 
// if (result == "RFID1:1") {
// coolToSend = "yes";
// designer = stock[0].designer;
// maker = stock[0].maker;
// model = stock[0].item;
// designerImage = stock[0].desImage;
// makerImage = stock[0].makeImage;
// modelImage = stock[0].prodImage;
// productTag = stock[0].prodTag;
// productInfo = stock[0].prodInfo;
// designerBio = stock[0].desBio;
// makerBio = stock[0].makerBio;
// designerLink = stock[0].desLink;
// makerLink = stock[0].makeLink;
// message = coolToSend + "*" + designer + "*" + maker + "*" + model + "*" + designerImage + "*" + makerImage + "*" + modelImage + "*" + productTag + "*" + productInfo + "*" + designerBio + "*" + makerBio + "*" + designerLink + "*" + makerLink;
// console.log(message);
// }

// else if (result == "RFID2:1") {
// coolToSend = "yes";
// designer = stock[1].designer;
// maker = stock[1].maker;
// model = stock[1].item;
// designerImage = stock[1].desImage;
// makerImage = stock[1].makeImage;
// modelImage = stock[1].prodImage;
// productTag = stock[1].prodTag;
// productInfo = stock[1].prodInfo;
// designerBio = stock[1].desBio;
// makerBio = stock[1].makerBio;
// designerLink = stock[1].desLink;
// makerLink = stock[1].makeLink;
// message = coolToSend + "*" + designer + "*" + maker + "*" + model + "*" + designerImage + "*" + makerImage + "*" + modelImage + "*" + productTag + "*" + productInfo + "*" + designerBio + "*" + makerBio + "*" + designerLink + "*" + makerLink;
// console.log(message);

// }

// else if (result == "RFID3:1") {
// coolToSend = "yes";
// designer = stock[2].designer;
// maker = stock[2].maker;
// model = stock[2].item;
// designerImage = stock[2].desImage;
// makerImage = stock[2].makeImage;
// modelImage = stock[2].prodImage;
// productTag = stock[2].prodTag;
// productInfo = stock[2].prodInfo;
// designerBio = stock[2].desBio;
// makerBio = stock[2].makerBio;
// designerLink = stock[2].desLink;
// makerLink = stock[2].makeLink;
// message = coolToSend + "*" + designer + "*" + maker + "*" + model + "*" + designerImage + "*" + makerImage + "*" + modelImage + "*" + productTag + "*" + productInfo + "*" + designerBio + "*" + makerBio + "*" + designerLink + "*" + makerLink;
// console.log(message);

// }

// else if (result == "RFID4:1") {
// coolToSend = "yes";
// designer = stock[3].designer;
// maker = stock[3].maker;
// model = stock[3].item;
// designerImage = stock[3].desImage;
// makerImage = stock[3].makeImage;
// modelImage = stock[3].prodImage;
// productTag = stock[3].prodTag;
// productInfo = stock[3].prodInfo;
// designerBio = stock[3].desBio;
// makerBio = stock[3].makerBio;
// designerLink = stock[3].desLink;
// makerLink = stock[3].makeLink;
// message = coolToSend + "*" + designer + "*" + maker + "*" + model + "*" + designerImage + "*" + makerImage + "*" + modelImage + "*" + productTag + "*" + productInfo + "*" + designerBio + "*" + makerBio + "*" + designerLink + "*" + makerLink;
// console.log(message);
// }

// else {
// coolToSend = "no";
// message = coolToSend + "*" + ": no information yet";
// }
// console.log(message);

// //Api for Connection test, prints success on the Client
// }



// function sendToSerial(data) {
//   console.log("sending to serial: " + data);
//   // port.write(data);
// }

