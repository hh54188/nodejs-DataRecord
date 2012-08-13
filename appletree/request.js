var http = require('http');

var opts = {
	// host: 'www.baidu.com',
	host: 'www.appletreebooks.com/appIndex.php?c=eshop&m=get_hot_new_book_list&per_page=1&devid=c4c8874d16d84cde8fc7b9037ad8e26465bd1560&uid=1&ln=sn',
	// port: 80,
	path: '/',
	method: 'GET',
	// headers: {'content-type':'text/html'}
}

// var opts = {
// 	host: '127.0.0.1',
// 	port: 8000,
// 	path: '/',
// 	method: 'GET',
// 	headers: {'content-type':'application/x-www-form-urlencoded'}
// }

var req = http.request(opts, function (res) {
	res.setEncoding('utf8');
  	var data = ""
  	res.on('data', function(d) {
    	data += d;
  	})
  	res.on('end', function() {
    	console.log(data);
  	})
})

req.end();