var http = require("http");
var url = require("url");

var start = function (route, handle) {
	var onResquest = function (request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log('Request for ' + pathname + " has received");

		route(handle, pathname);

		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello World");
		response.end();
	}

	http.createServer(onResquest).listen(8888);
	console.log('server has start');
}

exports.start = start;


