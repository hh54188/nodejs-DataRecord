var request = require('./request');
var filter = require('./datafilter');
var url = require('url');

var newBook = encodeURIComponent("http://paradise.tinman.cn/ProductSvr.svr/GetProductList?secCode=&prodType=-1&platform=ipad&age=-1&keyWord=&isNewPub=true&orderField=&startIndex=0&maxLength=100");
var notNewBook = encodeURIComponent("http://paradise.tinman.cn/ProductSvr.svr/GetProductList?secCode=&prodType=-1&platform=ipad&age=-1&keyWord=&isNewPub=false&orderField=&startIndex=0&maxLength=100");

//test
var url = "http://127.0.0.1:8000/proxy/?encoding=gbk&url=" + notNewBook;
var http = require('http');

console.log(url);

var req = http.request(url, function (res) {
	res.setEncoding('utf8');
	var data = ""
	res.on('data', function(d) {
		console.log(d);
  		data += d;
	})

	res.on('end', function() {
		console.log(data);
		filter.toJSON(data, filter.filterData);
	})
})

// setInterval(function () {
	// request.init(newBook, filter.toJSON, filter.filterData);
	// request.init(notNewBook, filter.toJSON, filter.filterData);
// }, 3600000);
