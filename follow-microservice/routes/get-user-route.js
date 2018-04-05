var express = require('express'),
 bodyParser = require('body-parser'),
 mongoose = require('mongoose'),
 mongoose_user = require('../mongoose/services/UserService.js');

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/user/:username', function(req, res){
	username = req.params.username;
	var user = mongoose_user.getUser(username);
	user.then(function(item){
		console.log(item);
		if (item){
			res.send({status: "OK", user: {
				email: item.email,
				followers: item.followers.length,
				following: item.following.length
			}})
		}
		 else {
			res.send({status: "error", error: "no user found"});
		}
	}).catch(err => {
		console.log(err);
	})
});

module.exports = router;
