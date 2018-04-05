var express = require('express'),
 bodyParser = require('body-parser'),
 mongoose = require('mongoose'),
 mongoose_user = require('../mongoose/services/UserService.js');

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.post('/follow', function(req, res){
	username = req.params.username;
	var user = mongoose_user.getUser(username);
	user.then(function(item){
		console.log(item);
		if (item){
			var arr = item.followers;
			var set = new Set(arr);
			var hasUser = set.has(username);
			if (hasUser){
				var index = arr.indexOf(username);
				arr
			} else {

			}
			res.send({status: "OK";})
		}
		 else {
			res.send({status: "error", error: "no user found"});
		}
	}).catch(err => {
		console.log(err);
	})
});

module.exports = router;
