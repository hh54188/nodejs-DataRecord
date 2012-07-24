var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

var start = function (response, postData) {
	console.log('Request handler start has called');

	var body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" '+
	'content="text/html; charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action="/upload" enctype="multipart/form-data" '+
	'method="post">'+
	'<input type="file" name="upload">'+
	'<input type="submit" value="Upload file" />'+
	'</form>'+
	'</body>'+
	'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();

}

var upload = function (response, request) {
	console.log('Request handler upload has called');

	var form = new formidable.IncomingForm();
	console.log('about to parse');
	form.parse(request, function(error, fields, files) {
		console.log("parsing done");
		fs.renameSync(files.upload.path, "/tmp/test.png");
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}

var show = function (response, postData) {
	console.log("Request handler 'show' was called");
	fs.readFile("/tmp/test.png", "binary", function (error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
     		response.write(error + "\n");
      		response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();			
		}
	})
}

exports.start = start;
exports.upload = upload;
exports.show = show;