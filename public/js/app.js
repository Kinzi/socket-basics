var socket = io();

socket.on('connect', function(){
	console.log('connected to socket.io server');
});

socket.on('message', function(msg){
	console.log(msg.text);

	jQuery('.messages').append('<p class="right">You: ' + msg.text + '</p>');
});

// Handles submitting of new msg
var $form = jQuery('#msg-form');

$form.on('submit', function(event){
	event.preventDefault();
	var $message = $form.find('input[name=message]');

	// jQuery('.messages').append('<p class="left">Me: ' + $message.val() + '</p>');

	socket.emit('message', {
		text: $message.val()
	})

	$message.val('');
	
});