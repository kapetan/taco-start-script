#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var minimist = require('minimist');
var start = require('./');

var argv = minimist(process.argv.slice(2));

if(argv.help) {
	var usage = fs.readFileSync(path.join(__dirname, 'usage.txt'), 'utf-8');
	console.error(usage);
} else {
	start(argv.env || process.env.NODE_ENV || 'development', function(err) {
		if(err) throw err;
	});
}
