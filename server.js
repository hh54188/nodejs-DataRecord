var http = require("http");
var url = require("url");

var start = function (route, handle) {
	var onResquest = function (request, response) {
		var postData = "";
	    var pathname = url.parse(request.url).pathname;
	    route(handle, pathname, response, request);
	}

	http.createServer(onResquest).listen(8888);
	console.log('server has start');
}

exports.start = start;


