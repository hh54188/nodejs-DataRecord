var file = require('./file');
var fs = require('fs');

var test = function (arr, obj) {
	var id = arr.shift();
	obj[id] = {};
	var filePath = 'file/' + id + '.js';
	fs.exists(filePath, function (exists) {
		if (exists) {
			fs.readFile(filePath, 'utf8', function (err, data) {
				if (err) {return console.log(err);}
				data = JSON.parse(data);
				obj[id] = data;
				console.log(obj[id]);
				if (arr.length == 0) {
					console.log(obj);
					return
				};
				test(arr, obj);
			})
		}
	})
}

var findDetail = function (data, ouput) {
	var tmp = [];
	for (var n in data) {
		tmp.push(n);
	}
	var obj = {}
	//正式进入
	test(tmp, obj);

}

var renderhd = function (res) {
	var d = new Date();
	var year = parseInt(d.getFullYear()),
		month = parseInt(d.getMonth()) + 1,
		today = parseInt(d.getDate().toString());
	var tmp = ['count', 'name'];
	for (var i = 6; i >= 0 ; i--) {
		var day = today - i;
		var day = year.toString() + '-' + month.toString() + '-' + day.toString();
		tmp.push(day)
	}
	res.render('foo.html', { head: tmp, title: 'test'});
	file.readFile('booklist', findDetail);
}

var render = function () {
	
}
exports.renderhd = renderhd;