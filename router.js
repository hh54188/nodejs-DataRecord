var express = require('express');

var app = express();
app.configure(function () {
	app.use(express.static(__dirname + '/static'));
	app.use(express.bodyParser());
	app.use(app.router);
})

app.get('/', function (req, res) {
	res.redirect('192.168.1.109:9000/');
});

app.get('/tong', function (req, res) {
	res.redirect('http://192.168.1.109:7000/');
});

app.listen(6000);