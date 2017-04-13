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
  function circle(x, y, c) {
  fill(c);
  noStroke();
  ellipse(x,y,20,20);
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
  for (var i = 0; i < table.getRowCount(); i++) {
    var row = table.getRow(i);
    var x = row.get("x");
    var y = row.get("y");
    var c = row.get("colour");
    circle(x, y, c);
  }
}
