var express = require('express'),
 bodyParser = require('body-parser'),
 mongoose = require('mongoose'),
 mongoose_addItem = require('../mongoose/services/addItemService.js');

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.post('/search', function(req, res){
	timestamp = req.body.timestamp;
	limit = req.body.limit;
	var items = mongoose_addItem.searchItems({timestamp: timestamp, limit: limit});
	items.then(function(items){
		res.send({status: "OK", items: items});
	}).catch(err => {
		console.log(err);
		res.send({status: "error", error: err})
	})
});

module.exports = router;