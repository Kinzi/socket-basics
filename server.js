var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
	console.log('user connected via socket.io');

	socket.on('message', function(msg){
		console.log('Message recieved: ' + msg.text);
		socket.broadcast.emit('message', msg);
	});

	socket.emit('message', {
		text: 'Welcome to the ChatApp'
	});
})

http.listen(PORT, function() {
	console.log('server started');
})