var express = require('express'),
 bodyParser = require('body-parser'),
 mongoose = require('mongoose'),
 mongoose_addItem = require('../mongoose/services/addItemService.js');

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/item/:id', function(req, res){
	id = req.params.id;
	var item = mongoose_addItem.getItem(mongoose.Types.ObjectId(id));
	item.then(function(item){
		if (item){
			username = item.username;
			retweeted = item.retweeted;
			content = item.content;
			timestamp = item.timestamp;
			likes = item.likes;
			res.send({status: "OK", item: {
				id: id,
				username: username,
				property:{
					likes: likes
				},
				retweeted: retweeted,
				content: content,
				timestamp: timestamp
			}})
		}
		 else {
			res.send({status: "error", error: "no item found"});
		}
	}).catch(err => {
		console.log(err);
	})
});

module.exports = router;