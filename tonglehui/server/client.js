var express = require('express');
var render = require('./render');

var app = express();
app.configure(function () {
	app.use(express.static(__dirname + '/static'));
	app.use(express.bodyParser());
	app.use(app.router);

	//template
	app.set('views', __dirname + '/views');
	// app.set('view options', {layout: true});
	app.engine('html', require('ejs').renderFile);	
})
app.get('/', function (req, res) {
	render.initRender(res);
});

app.listen(9001);