var fs = require('fs');

var writeToFile = function (file, data) {
	var filePath = 'file/' + file + '.js';
	fs.writeFile(filePath, data, function (err) {
		if (err) {
			return console.log(err);
		}
	})
}

var check = function (book, origin) {
	var flag = 0;
	for (var i in book) {
		flag = 0;
		for (var j in origin) {
			if (i == j) {
				flag = 1
				var len = origin[j].detail.length;
				if (origin[j].detail[len - 1].timestamp != book[i].detail[0].timestamp) {
					origin[j].detail.push(book[i].detail[0]);
				}
			};
		}
		if (!flag) {
			origin[i] = book[i];
		}
	}
	
	origin = JSON.stringify(origin);
	writeToFile('book', origin);
}

var getBookList = function (book) {
	fs.exists('file/book.js', function (exists) {
		if (!exists) return;
		fs.readFile('file/book.js', 'utf8', function (err, data) {
			if (err) {
				return console.log(err);
			}
			origin = JSON.parse(data);
			check(book, origin);
		});
	})	
}

var readFile = function () {
	fs.exists('file/book.js', function (exists) {
		if (!exists) return;
		fs.readFile('file/book.js', 'utf8', function (err, data) {
			if (err) {
				return console.log(err);
			}
			origin = JSON.parse(data);
		});
	})		
}


exports.getBookList = getBookList;
exports.readFile = readFile;