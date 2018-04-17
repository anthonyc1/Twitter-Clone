var express = require('express'),
 bodyParser = require('body-parser'),
 Memcached = require('memcached'),
 mongoose = require('mongoose'),
 mongoose_user = require('../mongoose/services/UserService.js');

var memcached = new Memcached('127.0.0.1:11211');
var lifetime = 86400;

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/user/:username/following', function(req, res){
	username = req.params.username;
	limit = req.params.limit;
	if (limit && (limit > 100 || limit < 0)){
		res.send({status: "error", error: "limit is out of range"});
	}
	var key = username+"following";
	memcached.get(key, function(err, result){
		if (result != undefined){
			console.log("get: " + result);
			res.send(result);
		} else {
			var user = mongoose_user.getFollowing(username, limit);
			user.then(function(item){
				console.log(item);
				if (item){
					var myObj = {
						status: "OK",
						users: item.following,
					};
					memcached.set(key, myObj, lifetime, function(err, result){
						if (err) throw err;
						console.log("set: " + result);
					})
					res.send(myObj);
				}
				 else {
					res.send({status: "error", error: "no user found"});
				}
			}).catch(err => {
				console.log(err);
			})
		}
	})
});

module.exports = router;
