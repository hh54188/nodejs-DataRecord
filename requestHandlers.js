var start = function () {
	console.log('Request handler start has called');
}

var upload = function () {
	console.log('Request handler upload has called');
}

exports.start = start;
exports.upload = upload;