var socket = io();

socket.on('connect', function(){
	console.log('connected to socket.io server');
});

socket.on('message', function(msg){
	console.log(msg.text);
});