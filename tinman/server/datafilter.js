
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var file = require('./file.js');

//toJson
var toJSON = function (data, filter) {
	parser.parseString(data, function (err, result) {
		if (err) {
			return console.log(err);
		}

		console.log("hi I'm here");
		console.log(result);
		// if (filter) {
		// 	filter(result);	
		// }
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
	var bookKey = ['title_sc', 'ftitle_sc', 'AppDescSC', 'Age', 'Category', 'PublisherSC', 'CategorySC', 'InAppSmallCoverSC', 'ReviewPhoto1', 'FileSize', 'InAppProID'];
	var detailKey = ['BuyPoint', 'Price', 'RmbPrice', 'DownLoad', 'HasBought']
	var remoteBooks = data.book;
	var localBooks = {};
	var detail = {};

	for (var b = 0; b < remoteBooks.length; b++) {
		var id = remoteBooks[b].id;
		localBooks[id] = {};
		detail[id] = {};
		for (var p in remoteBooks[b]) {
			//书的基本信息
			if (isAllow(p, bookKey)) {
				localBooks[id][p] = remoteBooks[b][p];
			}
			//书的当日信息
			if (isAllow(p, detailKey)) {
				detail[id][p] = remoteBooks[b][p];
			}

			var timestamp = new Date();
			timestamp = timestamp.getFullYear().toString() + '-' + (parseInt(timestamp.getMonth()) + 1).toString() + '-' + timestamp.getDate().toString();
			detail[id]["timestamp"] = timestamp;
		}		
	}

	file.getBookList(localBooks, detail);
}

exports.toJSON = toJSON;
exports.filterData = filterData;