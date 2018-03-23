var express = require('express'),
 bodyParser = require('body-parser'),
 jwt = require('jsonwebtoken'),
 mongoose = require('mongoose'),
 mongoose_addItem = require('../mongoose/services/addItemService.js');

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

var secret;
var validContentTypes = [null, 'retweet','reply'];

router.post('/additem', function(req, res){
	id = mongoose.Types.ObjectId();
	//var userJWT = jwt.verify(req.cookies.token, secret);
	if (true){
		if (req.body.content == null || !(new Set(validContentTypes).has(req.body.childType)))
			res.send({status: "error", error: "unable to create user"});
		else {
			var item = mongoose_addItem.createItem({
				//username: userJWT.username,
				username: "test",
				content: req.body.content,
				childType: req.body.childType,
				likes: 0,
				retweeted: 0,
				timestamp: Date.now(),
				id: id
			});
			res.send({status: "OK", id: id});
		}
	} else {
		res.send({status: "error", error: "invalid session"});
	}
});

module.exports = router;