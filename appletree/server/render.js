var file = require('./file');
var fs = require('fs');

var dateCount= function (day, month, year) {
	var monthDay = [29, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var isLeapYear = function (year) {
		if ((year%4==0&&year%100!=0)||(year%400==0)) {
			return true;
		} else {
			return false;
		}
	}

	month = month - 1;
	if (month == 2 && isLeapYear(year)) {
		day = monthDay[0];
	} else {
		day = monthDay[month];	
	}
}

var render = function (data, res) {
	var d = new Date();
	var year = parseInt(d.getFullYear()),
		month = parseInt(d.getMonth()) + 1,
		today = parseInt(d.getDate().toString());
	var thead = ['count', 'name'];
	for (var i = 6; i >= 0 ; i--) {
		var day = today - i;
		if (day <= 0) {
			dateCount(day, month, year);
		}
		var day = year.toString() + '-' + month.toString() + '-' + day.toString();
		thead.push(day)
	}
	res.render('foo.html', { head: thead, body: data, title: 'Appletree'});
}

var collect = function (arr, collection, res) {
	var id = arr.shift();
	var filePath = 'file/' + id + '.js';
	fs.exists(filePath, function (exists) {
		if (exists) {
			fs.readFile(filePath, 'utf8', function (err, data) {
				if (err) {
					console.log(err);
					return;
				}
				data = JSON.parse(data);
				collection[id]['detail'] = data;
				if (arr.length == 0) {
					render(collection, res);
					return;
				};
				collect(arr, collection, res);
			})
		} else {
			if (arr.length == 0) {
				render(collection, res);
				return;
			};			
			collect(arr, collection, res);
		}
	})
}

var collectEach = function (data, res) {
	var tmp = [];
	var collection = {};
	for (var n in data) {
		tmp.push(n);
		collection[n] = {};
		collection[n]['basic'] = data[n];
	}
	//正式进入
	collect(tmp, collection, res);
}


var initRender = function (res) {
	file.readFile('booklist', collectEach, res);	
}

exports.initRender = initRender;