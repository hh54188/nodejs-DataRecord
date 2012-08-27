var request = require('./request');
var filter = require('./datafilter');
var url = require('url');

var recommend = "http://42.121.12.22:8000/books/recommend.json";
// var recommend = "42.121.12.22:8000/books/recommend.json";

// setInterval(function () {
	request.init(recommend, filter.toJSON, filter.filterData);
// }, 3600000);
