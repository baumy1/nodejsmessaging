// ITP Networked Media, Fall 2014
// https://github.com/shiffman/itp-networked-media
// Daniel Shiffman

// Keep track of our socket connection
var socket;
document.getElementById('btn').addEventListener("click", sendmsg);

function setup() {
  createCanvas(400, 400);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('https://nodejsmessaging.herokuapp.com/');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('mouse',
    // When we receive data
    function(data) {
      console.log("Got: " + data.x + " " + data.y);
      // Draw a blue circle
      fill(0,0,255);
      noStroke();
      ellipse(data.x, data.y, 20, 20);
    }
  );
}

function draw() {
    background(0);
  socket.on('message',
    // When we receive data
    function(data) {
      console.log("Got: " + data.message);
      // Draw a blue circle
    $('.msgs').append('</p>' + data.message + "</p>");
    }
  );
}

function mouseDragged() {
  // Draw some white circles
  fill(255);
  noStroke();
  ellipse(mouseX,mouseY,20,20);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY);
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);
  
  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}

// Function for sending to the socket
function sendmsg() {
  // We are sending!
  msg = document.querySelector('input').value;
  console.log("Sending Message: " + msg);
  
  // Make a little object with  and y
  var data = {
    message: msg   
  };
  
  $('.msgs').append('</p>' + data.message + "</p>");

  // Send that object to the socket
  socket.emit('message',data);
}
