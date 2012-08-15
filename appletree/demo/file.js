var fs = require('fs'),
	xml2js = require('xml2js');
var parser = new xml2js.Parser();
fs.exists('tmp', function (exists) {
	if (exists) {
		console.log('have this file');
		//读取文件
		// fs.readFile('tmp/appletree.xml', 'utf8', function (err, data) {
		// fs.readFile('tmp/test.txt', 'utf8', function (err, data) {
		// 	if (err) {
		// 		return console.log(err);
		// 	}
		// 	console.log(JSON.parse(data));
		// 	// console.log(data);
		// 	//xml data format
		// 	// parser.parseString(data, function (err, result) {
		//  	//     console.dir(result);
		//     //     console.log('Done');
		//     // });
		// });


		//写文件
		// fs.writeFile('tmp/test.txt', 'Hello Lee', function (err) {
		// 	if (err) {
		// 		return console.log(err);
		// 	}
		// 	console.log('save successed!');
		// })


		// 插入文件
		var obj = {
			name: 'lee',
			city: 'beijing',
			sex: 'man'
		}
		fs.appendFile('tmp/test.txt', JSON.stringify(obj), function (err) {
			if (err) {
				return console.log(err);
			}
			console.log('append successed!');
		})
	} else {
		console.log('no such file');
	}
});