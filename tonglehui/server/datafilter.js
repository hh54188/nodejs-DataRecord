var file = require('./file.js');

//toJson
var toJSON = function (data, filter) {
	data = JSON.parse(data).data;
	filter(data);
}

var isAllow = function (key, list) {
	for (var i = 0; i < list.length; i++) {
		if (key == list[i]) {
			return true;
		}
	}

	return false;
}

var setTimeStamp = function () {
	var timestamp = new Date();
	timestamp = timestamp.getFullYear().toString() + '-' + (parseInt(timestamp.getMonth()) + 1).toString() + '-' + timestamp.getDate().toString();
	return timestamp;
}

//filter 
var filterData = function (data) {
	// console.log(data);
	var bookKey = ['name', 'desc', 'author', 'icon', 'apple_id', 'created_at', 'age', 'ReviewPhoto1', 'FileSize', 'InAppProID', 'icon_url', 'banner_url', 'screens'];
	var detailKey = ['price', 'status', 'is_recommended', 'is_banner', 'is_recommended', 'updated_at', 'downloads', 'version', 'column_id', 'user_id', 'order_stamp'];
	var book = {};
	for (var d = 0; d < data.length; d++) {
		book[data[d]["id"]] = {};
		book[data[d]["id"]].basic = {};
		book[data[d]["id"]].detail = [];
		var detail = {};
		for (var p in data[d]) {
			if (isAllow(p, bookKey)) {
				book[data[d]["id"]].basic[p] = data[d][p];
			} else if (isAllow(p, detailKey)) {
				detail[p] = data[d][p];
			}
		}

		detail["timestamp"] = setTimeStamp();
		book[data[d]["id"]].detail.push(detail);
	}

	file.getBookList(book);
}

exports.toJSON = toJSON;
exports.filterData = filterData;