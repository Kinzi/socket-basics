var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

socket.on('connect', function(){
	console.log('connected to socket.io server');
	console.log(name + ' joined ' + room);
});

socket.on('message', function(msg){
	var momentTimestamp = moment.utc(msg.timestamp);
	var $message = jQuery('.messages');

	$message.append('<p><strong>' + momentTimestamp.local().format('HH:mm') + ' ' + msg.name + ':</strong></p>');
	$message.append( '<p>' + msg.text + '</p>');
	$message.append('<br/>');
});

// Handles submitting of new msg
var $form = jQuery('#msg-form');

$form.on('submit', function(event){
	event.preventDefault();
	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val(),
		name: name
	})

	$message.val('');
	
});