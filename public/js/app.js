var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

socket.on('connect', function() {
	console.log('connected to socket.io server');
	console.log(name + ' joined ' + room);
});

socket.on('message', function(msg) {
	var momentTimestamp = moment.utc(msg.timestamp);
	var $message = jQuery('.messages');

	if (msg.name === name){
		$message.append('<div class="row"><div class="col-sm-10"><div class="card card-outline-primary text-xs-left"><div class="card-block"><p class="card-text">' + msg.text + '</div><div class="card-footer text-muted">' + momentTimestamp.local().format('HH:mm') + ' ' + msg.name + '</div></div></div><div class="col-sm-2"></div></div>');
	} else {
		$message.append('<div class="row"><div class="col-sm-2"></div><div class="col-sm-10"><div class="card card-outline-success text-xs-right"><div class="card-block"><p class="card-text">' + msg.text + '</div><div class="card-footer text-muted">' + momentTimestamp.local().format('HH:mm') + ' ' + msg.name + '</div></div></div></div>');
	}
});

// Handles submitting of new msg
var $form = jQuery('#msg-form');

$form.on('submit', function(event) {
	event.preventDefault();
	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val(),
		name: name
	})

	$message.val('');

});