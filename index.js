var fs = require('fs');
var child = require('child_process');

module.exports = function(env, callback) {
	fs.readFile('package.json', 'utf-8', function(err, pkg) {
		if(err) return callback(err);

		try {
			pkg = JSON.parse(pkg);
		} catch(err) {
			return callback(err);
		}

		var script = pkg && pkg.scripts && pkg.scripts['start-' + env];

		if(script) child.exec(script, callback);
		else callback(new Error('Missing start script for ' + env));
	});
};
