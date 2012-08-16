var request = require('./request');
var filter = require('./datafilter');
var url = require('url');

var hotBook = "http://www.appletreebooks.com/appIndex.php?c=eshop&m=get_hot_new_book_list&per_page=1&devid=c4c8874d16d84cde8fc7b9037ad8e26465bd1560&uid=1&ln=sn";
var newBook = "http://www.appletreebooks.com/appIndex.php?c=eshop&m=get_new_book_list&per_page=1&devid=c4c8874d16d84cde8fc7b9037ad8e26465bd1560&uid=1&ln=sn";
var freeBook = "http://www.appletreebooks.com/appIndex.php?c=eshop&m=get_new_free_book_list&per_page=0&devid=c4c8874d16d84cde8fc7b9037ad8e26465bd1560&uid=1&ln=sn";

request.init(hotBook, filter.toJSON, filter.filterData);
request.init(newBook, filter.toJSON, filter.filterData);
request.init(freeBook, filter.toJSON, filter.filterData);