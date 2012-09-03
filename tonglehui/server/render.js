var file = require('./file');
var fs = require('fs');

var dateCount= function (day, month, year) {
					//0	1   2   3   4   5   6   7   8   9   10  11  12
	var monthDay = [29, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var isLeapYear = function (year) {
		if ((year%4==0&&year%100!=0)||(year%400==0)) {
			return true;
		} else {
			return false;
		}
	}

	month = month - 1;
	if (month <= 0) {
		month = 12;
		year = year - 1;
	}

	if (month == 2 && isLeapYear(year)) {
		day = monthDay[0];
	} else {
		day = monthDay[month];	
	}

	var obj = {
		day: day,
		month: month,
		year: year
	}

	return obj;
}

var utility = function (detail, todayStamp) {
	var prev = ""; cur = "";
	var d = {};
	for (var i = 0; i < detail.length; i++) {
		prev = cur;
		cur = detail[i];

		if (cur.timestamp == todayStamp) {
			if (!prev || !cur) break;
			d.price = parseInt(cur.price) != parseInt(prev.price)? false: true;
			d.download = parseInt(cur.downloads) - parseInt(prev.downloads);
			break;
		}
	}
	return d;
}

var render = function (data, res) {
    var d = new Date();
    var year = parseInt(d.getFullYear()),
        month = parseInt(d.getMonth()) + 1,
        today = parseInt(d.getDate().toString());
    var thead = ['编号', '书名'];
    var j = 1;

    var day = year.toString() + '-' + month.toString() + '-' + today.toString();
    thead.push(day);
    for (var i = 0; i < 6; i++) {
        var today = today - j;
        if (today <= 0) {
            var newDate = dateCount(day, month, year);
            today = newDate.day;
            month = newDate.month;
            year = newDate.year;
        }

        var day = year.toString() + '-' + month.toString() + '-' + today.toString();
        thead.push(day);
    }

	res.render('foo.html', { head: thead, body: data, title: 'Appletree', utility: utility});
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
	fs.exists('file/book.js', function (exists) {
		if (!exists) return;
		fs.readFile('file/book.js', 'utf8', function (err, data) {
			if (err) {
				return console.log(err);
			}
			origin = JSON.parse(data);
			render(origin, res);
		});
	})	
}

exports.initRender = initRender;