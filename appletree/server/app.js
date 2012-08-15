var request = require('./request');
var filter = require('./datafilter');

request.init(filter.toJSON, filter.filterData);