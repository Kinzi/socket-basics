var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
	console.log('user connected via socket.io');

	socket.on('message', function(msg){
		console.log('Message recieved: ' + msg.text);
		msg.timestamp = moment().valueOf();
		io.emit('message', msg);
	});

	socket.emit('message', {
		text: 'Welcome to the ChatApp',
		name: 'Server',
		timestamp: moment().valueOf()
	});
})

http.listen(PORT, function() {
	console.log('server started');
})