var socket;
var fileName;
var table;
var circles;

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
      fill(0,0,255);
      noStroke();
      ellipse(data.x, data.y, 20, 20);
    }
  );
  }

function draw() {
  for (var i = 0; i < circles.length; i++) {
    bubbles[i].display();
  }
}

function mouseDragged() {
  fill(255);
  noStroke();
  ellipse(mouseX,mouseY,20,20);
  sendmouse(mouseX,mouseY);
}

function sendmouse(xpos, ypos) {
  console.log("sendmouse: " + xpos + " " + ypos);

  var data = {
    x: xpos,
    y: ypos
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}

function loadData() {

  circles = [];

  // You can access iterate over all the rows in a table
  for (var i = 0; i < table.getRowCount(); i++) {
    var row = table.getRow(i);
    // You can access the fields via their column name (or index)
    var x = row.get("x");
    var y = row.get("y");
    var c = row.get("colour");
    // Make a Bubble object out of the data read
    colour[i] = new Circle(x, y, c);
  }
}

 function circle(x, y, c) {
  this.x = Number(x);
  this.y = Number(y);
  this.colour = c;

  // Display the Circle
  this.display = function() {
    fill(this.colour);
    noStroke();
    ellipse(this.x, this.y, 20,20);
  }
}
