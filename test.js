var child_process = require('child_process');
var events = require('events');
var util = require('util');


if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position) {
		position = position || 0;
		return this.indexOf(searchString, position) === position;
	};
}



var args = [
	'-cp',
	'lib/Ab.jar',
	'Main',
	'bot=alice2',
	'action=chat',
	'trace=false',
];
var child = child_process.spawn('java', args);

child.stdout.on('data', function(data) {
	var dataStr = data.toString();
	// console.log(dataStr);
	if (dataStr.startsWith('Human:')) {
		console.log('ok stdout: ' + dataStr);
		child.stdin.write('Hi\n');
		child.stdin.uncork();
	}
});

child.stderr.on('data', function (data) {
	console.log('stderr: ' + data);
});

child.on('close', function (code) {
	console.log('child process exited with code ' + code);
});


process.on('SIGINT', function() {
	console.log("Caught interrupt signal");
	child.kill();
	// Do not call `process.exit()`
});
