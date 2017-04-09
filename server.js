var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var gm = require('gm');

var app = express();
app.use(fileUpload());

// Set up the server
var server = app.listen(process.env.PORT || 80, listen);

function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at https://' + host + ':' + port);
}

app.use(express.static('public'));

//Uploading files Section
app.post('/upload', function(req, res) {
   /* if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
    let sampleFile = req.files.sampleFile;

    console.log("File Ext: " + sampleFile.name.split('.').pop());

    // Use the mv() method to place the file somewhere on your server 
    sampleFile.mv('public/drawing/image.' + sampleFile.name.split('.').pop(), function(err) {
        if (err)
            return res.status(500).send(err);

        fs.writeFile("public/drawing/name.css", 'canvas {background-image: url("image.' + sampleFile.name.split('.').pop() + '");}', function(err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });
        res.send('File uploaded!');
    });*/
});

// WebSocket Portion
var io = require('socket.io')(server);

io.sockets.on('connection',
    function(socket) {

        console.log("We have a new client: " + socket.id);

        // Drawing Tools 
        socket.on('mouse',
            function(data) {
                console.log("Received: 'mouse' " + data.x + " " + data.y);
                socket.broadcast.emit('mouse', data);
            }
        );

        // Instant Messaging
        socket.on('message',
            function(data) {
                console.log("Received: " + data.message);
                socket.broadcast.emit('message', data);
            }
        );

        socket.on('disconnect', function() {
            console.log("Client has disconnected");
        });
    }
);
