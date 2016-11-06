var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

function sendCurrentUsers(socket) {
	var info = clientInfo[socket.id];
	var users = [];

	if (typeof info === 'undefined') {
		return;
	}

	Object.keys(clientInfo).forEach(function(socketId) {
		var userInfo = clientInfo[socketId];
		if (info.room === userInfo.room) {
			users.push(userInfo.name);
		}
	});

	socket.emit('message', {
		name: 'Server',
		text: 'Logged in users: ' + users.join(', '),
		timestamp: moment().valueOf()
	});

};

io.on('connection', function(socket) {
	console.log('user connected via socket.io');

	socket.on('disconnect', function() {
		var userData = clientInfo[socket.id]
		if (typeof userData !== 'undefined') {
			socket.leave(userData.room);
			io.to(userData.room).emit('message', {
				text: userData.name + ' has left',
				name: 'Server',
				timestamp: moment().valueOf()
			});
			delete clientInfo[socket.id];
		}
	});

	socket.on('joinRoom', function(req) {
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message', {
			text: req.name + ' has joined',
			name: 'Server',
			timestamp: moment().valueOf()
		});
	});

	socket.on('message', function(msg) {
		console.log('Message recieved: ' + msg.text);

		if (msg.text === '@currentUsers') {
			sendCurrentUsers(socket);
		} else {
			msg.timestamp = moment().valueOf();
			io.to(clientInfo[socket.id].room).emit('message', msg);
		}
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