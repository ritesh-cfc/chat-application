// we set up a connection between the server and the front end!!!
var socket = io.connect("http://localhost:3000");

var message = document.getElementById("message")
var handle = document.getElementById("handle");
var btn = document.getElementById("send");
var output = document.getElementById("output");
var type = document.getElementById("typing");

// when we send a message..!!!
//message will be delivered on cliking send button!!!
btn.addEventListener("click", function(){
  socket.emit("chat", {
      message: message.value,
      handle: handle.value
  });
  //message.value = "";
});

// message is delivered on pressing enter key!!!
message.addEventListener("keypress",function(ev){
  if(ev.keyCode === 13){
    socket.emit("chat", {
        message: message.value,
        handle: handle.value
    });
  }

});

//when an user types a message, others get the typing message!!!
message.addEventListener("keypress",function(){
  socket.emit("typing",handle.value);
});

message.addEventListener("keyup",function(){
  type.innerHTML="";
});

// display the message in the output area...!!!
socket.on("chat", function(data){
  type.innerHTML="";
    output.innerHTML += "<p><strong>" + data.handle + " </strong>" + data.message + "</p>";
});

socket.on("typing",function(data){
  type.innerHTML = "<p><em>" + data + " is typing!!!</em></p>";
});
