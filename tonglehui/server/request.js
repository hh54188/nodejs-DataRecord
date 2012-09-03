var http = require('http');
var filter = require('./datafilter');
var parser = require('url');

var init = function (url, toJSON, filter) {
	var req = http.request(url, function (res) {
		res.setEncoding('utf8');
		var data = ""
		res.on('data', function(d) {
	  		data += d;
		})

		res.on('end', function() {
			// console.log(data);
			toJSON(data, filter);
		})
	})

	//error handle
	req.on('error', function(e) {
		return console.log('problem with request: ' + e.message);
	});

	req.end();	
}

exports.init = init;

