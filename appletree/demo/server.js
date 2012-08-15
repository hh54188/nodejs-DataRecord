var express = require('express');
var app = express();
app.configure(function () {
	app.use(express.static(__dirname + '/static'));
	// app.use(express.logger());
	app.use(express.bodyParser());
	app.use(app.router);

})
app.get('/', function (req, res) {
	res.send('hello world');
});
app.listen(8000);