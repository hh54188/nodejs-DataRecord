
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

//toJson
var toJSON = function (data, filter) {
	parser.parseString(data, function (err, result) {
		if (err) {
			return console.log(err);
		}

		if (filter) {
			filter(result);	
		}
    });
}

var isAllow = function (key, list) {
	for (var i = 0; i < list.length; i++) {
		if (key == list[i]) {
			return true;
		}
	}

	return false;
}

//filter 
var filterData = function (data) {
	var whiteKey = ['title_sc', 'ftitle_sc', 'Age', 'RmbPrice', 'FileSize', 'DownLoad', 'PublisherSC', 'CategorySC'];
	var books = data.book;
	var filterData = {};

	var d = new Date();
	d = d.getFullYear().toString() + d.getHours().toString() + d.getMinutes().toString();
	filterData["timestamp"] = d;

	filterData["books"] = {};
	for (var i = 0; i < books.length; i++) {
		var book = {};
		for (var p in books[i]) {
			if (isAllow(p, whiteKey)) {
				book[p] = books[i][p];
			}
		}
		filterData.books[books[i]["id"]] = book;
	}

	console.log(filterData);
}

exports.toJSON = toJSON;
exports.filterData = filterData;