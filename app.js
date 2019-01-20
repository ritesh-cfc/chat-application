var express = require("express");
var socket = require("socket.io");

var app=express();

var server = app.listen(3000,function(){
  console.log("connected to port number 3000!!!");
});

//lets put the static files here

app.use(express.static("public"));

var io = socket(server); //the socket is setup between the server and the frontend
io.on("connection",function(socket){ //"connection" event takes place!!!
  console.log("socket connection is established!!!");

  socket.on("chat",function(data){
    io.emit("chat",data);
  });

  socket.on("typing",function(data){
    socket.broadcast.emit("typing",data);
  });

});


//socket.id
//the param socket gets a new ID everytime it is set up...!!!
