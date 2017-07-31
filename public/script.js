//Global Variables
var baseURL = "http://10.208.178.117:8080";
var counter = 0;
var mainContent = document.getElementById('main');
var start = document.getElementById('start');
var locations = document.getElementById('locations');
    var clipperID;

var state = 0;
console.log(state);

var colors = ["red", "green", "blue"];
var randomElement = colors[Math.floor(Math.random()*colors.length)]

function playSound () {
    document.getElementById('play').play();
}

//Begin the Website Interaction
window.onload = function() {
    locations.style.visibility = "hidden";
    testConnection();
    // run();
    console.log(state);
    ds();
};

function ds() {

    if (state == 0) {
        mainContent.innerHTML = "<center><strong>" + "Welcome!!!" + "</strong>" + "</br></br>" + "Please place your Clipper Card below and click button to start." + "</center>";
        start.style.visibility = "visible";
        locations.style.visibility = "hidden";

    }

 if (state == 1) {
        mainContent.innerHTML = "Thank you Clipper Card Holder: "  +  clipperID +  "</br>" + "Please Select a Location";
        start.style.visibility = "hidden";
        locations.style.visibility = "visible";

    }

   if (state == 2) {
        mainContent.innerHTML = "Thank you so much!" + "</br>" + "The estimated wait time is 5 minutes." + "</br>" + "Head to the " +  randomElement + " pickup station to catch you ride. "
        setTimeout(restart, 5000);

    }

    if (counter == 4) {
        alert("Contacting Ride Share Driver Now.");
        counter = 0;
    } else {
        return;
    }
}

//Test the Connection
function testConnection() {
    $.ajax({
        method: "GET",
        url: baseURL + `/test`
    }).done(function(res) {
        console.log("getting test");
        console.log("Test result is " + res.message);

    })
}

function getData() {
    $.ajax({
        method: "GET",
        url: baseURL + `/data`
    }).done(function(res) {
        console.log("The data is " + res);
        handleData(res);
        playSound();
    })


}

function handleData(data) {
    var tempData = data.split("*");
    var clipperLoggedIn;

    for (item of tempData) {
        clipperID = tempData[1];
        clipperLoggedIn = tempData[0];
    }

    if (clipperLoggedIn == 'yes') {
        counter += 1;
        changeState();
        } else if (clipperLoggedIn == 'no') {
        console.log("nothing is logged in");
     alert("Please place your card in the center of the platorm!");

    } 
    console.log("The counter is " + counter);
    console.log("the state is " + state);
   
}

 function changeState() {
    state += 1;
    ds();
    playSound()
 }   

function restart() {
    state = 0;
    ds();
}




