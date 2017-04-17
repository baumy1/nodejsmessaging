var socket;
var fileName;
var table;
var circles;
var colour = "#0061ff";

function preload() {
  table = loadTable("data.csv", "header");
}

function setup() {
  loadData();
  createCanvas(1000, 563);
  socket = io.connect('https://nodejsmessaging.herokuapp.com');

  socket.on('mouse',
    function(data) {
      console.log("Got: " + data.x + " " + data.y);
      fill(data.colour);
      noStroke();
      ellipse(data.x, data.y, 20, 20);
    }
  );
  
  socket.on('refresh',
    function() {
      location.reload();    
  }
  );

  for (var i = 0; i < circles.length; i++) {
    circles[i].display();
  }
  }

function draw() {

}

function mouseDragged() {
  fill(colour);
  noStroke();
  ellipse(mouseX,mouseY,20,20);
  sendmouse(mouseX,mouseY);
}

function sendmouse(xpos, ypos) {
  console.log("sendmouse: " + xpos + " " + ypos);
  
  var data = {
    x: xpos,
    y: ypos,
    colour: colour
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}

function loadData() {
  circles = [];

  for (var i = 0; i < table.getRowCount(); i++) {
    var row = table.getRow(i);
    var x = row.get("x");
    var y = row.get("y");
    var c = row.get("colour");
    circles[i] = new circle(x, y, c);
  }
}

 function circle(x, y, c) {
  this.x = Number(x);
  this.y = Number(y);
  this.colour = c;
   console.log("I am the top of the circle function!");

  // Display the Circle
  this.display = function() {
    fill(this.colour);
    noStroke();
    ellipse(this.x, this.y, 20,20);
    console.log(this.x + " " + this.y + " " + this.colour);
  }
}

// Clear Function
document.getElementById("clear").addEventListener("click", clearCanvas);

var smile = "smile";

function clearCanvas () {
  socket.emit('clear', smile);
  location.reload();   
}
