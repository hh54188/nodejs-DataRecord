var fs = require('fs');

var writeToFile = function (file, data) {
	var filePath = 'file/' + file + '.js';
	fs.writeFile(filePath, data, function (err) {
		if (err) {
			return console.log(err);
		}
	})
}

var checkIdInList = function (books, list) {
	for (var b in books) {
		var insert = false;
		for (var l in list) {
			if (l == b) {
				//如果有相同的书Id则不用再插入了
				insert = true;
				break;
			}
		}
		if (!insert) {
			list[b] = books[b];
		}
	}
	
	list = JSON.stringify(list);
	writeToFile('booklist', list);
}

var getBookDetail = function (id, d) {
	var filePath = 'file/' + id + '.js';
	fs.exists(filePath, function (exists) {
		//如果没有该文件，直接写
		if (!exists) {
			var tmp = [];
			tmp.push(d);
			writeToFile(id, JSON.stringify(tmp));
		} else {
			fs.readFile(filePath, 'utf8', function (err, data) {
				if (err) {return console.log(err);}
				data = JSON.parse(data);
				var last = data[data.length - 1];

				var timestamp = last.timestamp;
				if (timestamp.split('-')[2] == d.timestamp.split('-')[2]) {
					return;
				};
				writeToFile(filePath, JSON.stringify(data.push(d)));
			});			
		}
	})	
}

var checkDetail = function (details) {
	for (var d in details) {
		getBookDetail(d, details[d]);
	}
}

var getBookList = function (books, details) {
	fs.exists('file/booklist.js', function (exists) {
		if (!exists) return;
		fs.readFile('file/booklist.js', 'utf8', function (err, data) {
			if (err) {
				return console.log(err);
			}
			data = JSON.parse(data);
			checkIdInList(books, data);
			checkDetail(details);
		});
	})	
}


exports.getBookList = getBookList;
exports.filterData = getBookDetail;

