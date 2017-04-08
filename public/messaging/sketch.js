// Keep track of our socket connection
var socket;
document.getElementById('btn').addEventListener("click", sendmsg);

function setup() {
  socket = io.connect('https://nodejsmessaging.herokuapp.com/');
  
  socket.on('message',
    // When we receive data
    function(data) {
      console.log("Got: " + data.message);
      // Draw a blue circle
    $('.msgs').append('</p>' + data.message + "</p>");
    }
  );
}

function draw() {
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
