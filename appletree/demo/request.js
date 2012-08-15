var http = require('http');
var url = require('url');

var opts = {
	host: 'www.appletreebooks.com',
	path: '/appIndex.php?c=eshop&m=get_hot_new_book_list&per_page=1&devid=c4c8874d16d84cde8fc7b9037ad8e26465bd1560&uid=1&ln=sn',
}

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

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.end();