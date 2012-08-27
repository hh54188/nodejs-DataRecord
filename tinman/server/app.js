var request = require('./request');
var filter = require('./datafilter');
var url = require('url');

var newBook = "http://paradise.tinman.cn/ProductSvr.svr/GetProductList?secCode=&prodType=-1&platform=ipad&age=-1&keyWord=&isNewPub=true&orderField=&startIndex=0&maxLength=100";
var notNewBook = "http://paradise.tinman.cn/ProductSvr.svr/GetProductList?secCode=&prodType=-1&platform=ipad&age=-1&keyWord=&isNewPub=false&orderField=&startIndex=0&maxLength=100";

//test
var url = "http://home.letun.com:8080/proxy/?encoding=gbk&url=" + newBook;
var http = require('http');

var req = http.request(url, function (res) {
	res.setEncoding('utf8');
	var data = ""
	res.on('data', function(d) {
  		data += d;
	})

	res.on('end', function() {
		console.log(data);
	})
})

// setInterval(function () {
	// request.init(newBook, filter.toJSON, filter.filterData);
	// request.init(notNewBook, filter.toJSON, filter.filterData);
// }, 3600000);
