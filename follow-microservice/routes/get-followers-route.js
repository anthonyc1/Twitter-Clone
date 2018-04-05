var express = require('express'),
 bodyParser = require('body-parser'),
 mongoose = require('mongoose'),
 mongoose_user = require('../mongoose/services/UserService.js');

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/user/:username/followers', function(req, res){
	username = req.params.username;
	limit = req.params.limit;
	if (limit && (limit > 100 || limit < 0)){
		res.send({status: "error", error: "limit is out of range"});
	}
	var user = mongoose_user.getFollowers(username, limit);
	user.then(function(item){
		console.log(item);
		if (item){
			res.send({
				status: "OK",
				users: item.followers,
			})
		}
		 else {
			res.send({status: "error", error: "no user found"});
		}
	}).catch(err => {
		console.log(err);
	})
});

module.exports = router;
