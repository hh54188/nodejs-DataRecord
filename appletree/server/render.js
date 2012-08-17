var file = require('./file');

var findDetail = function (data) {
	for (var n in data) {
		console.log(n);
	}
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