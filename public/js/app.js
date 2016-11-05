var socket = io();

socket.on('connect', function(){
	console.log('connected to socket.io server');
});

socket.on('message', function(msg){
	var momentTimestamp = moment.utc(msg.timestamp);
	jQuery('.messages').append('<p><strong>' + momentTimestamp.local().format('HH:mm') + ':</strong> ' + msg.text + '</p>');
});

// Handles submitting of new msg
var $form = jQuery('#msg-form');

$form.on('submit', function(event){
	event.preventDefault();
	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	})

	$message.val('');
	
});