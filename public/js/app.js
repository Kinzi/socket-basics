var socket = io();

socket.on('connect', function(){
	console.log('connected to socket.io server');
});

socket.on('message', function(msg){
	console.log(msg.text);
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