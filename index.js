var fs = require('fs');
var proc = require('child_process');
var eos = require('end-of-stream');

var noop = function() {};

function shell(command, options) {
	var file = null;
	var args = null;

	if (process.platform === 'win32') {
		file = process.env.comspec || 'cmd.exe';
		args = ['/s', '/c', '"' + command + '"'];
		options.windowsVerbatimArguments = true;
	} else {
		file = '/bin/sh';
		args = ['-c', command];
	}

	if(options.shell) file = options.shell;
	if(!options.stdio) options.stdio = 'inherit';

	return {
		file: file,
		args: args,
		options: options
	};
}

module.exports = function(env, options, callback) {
	if(!callback && typeof options === 'function') {
		callback = options;
		options = null;
	}

	options = options || {};
	callback = callback || noop;

	fs.readFile('package.json', 'utf-8', function(err, pkg) {
		if(err) return callback(err);

		try {
			pkg = JSON.parse(pkg);
		} catch(err) {
			return callback(err);
		}

		var script = pkg && pkg.scripts && pkg.scripts['start-' + env];

		if(script) {
			script = shell(script, options);
			var child = proc.spawn(script.file, script.args, script.options);
			eos(child, callback);

			return child;
		} else {
			callback(new Error('Missing start script for ' + env));
		}
	});
};
