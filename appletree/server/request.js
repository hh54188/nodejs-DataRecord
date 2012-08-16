var http = require('http');
var filter = require('./datafilter');
var parser = require('url');

var init = function (url, toJSON, filter) {
	var opts = {
		host: parser.parse(url).host,
		path: parser.parse(url).path
	}
	var req = http.request(opts, function (res) {
		res.setEncoding('utf8');
		var data = ""
		res.on('data', function(d) {
	  		data += d;
		})

		res.on('end', function() {
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

