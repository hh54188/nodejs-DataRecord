var express = require('express');
var app = express.createServer();
app.configure(function () {
	app.use(express.static(__dirname + '/static'));
})

// app.use(express.logger());
// app.use(app.router);
// app.use(express.bodyParser());


app.get('/', function(req, res){
    res.send('Hello World');
});

// app.post('/', function(req, res){
//   res.send(req.body);
// });


// var callback = function (req, res, next) {
// 	var user = req.params.id;
// 	if (user) {
// 		req.call = user;
// 		next();
// 	}
// }

// app.get('/user/:id', callback, function(req, res){
//     res.send('what in call back is: ' + req.call);
// });



app.listen(8000);