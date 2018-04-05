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
	current = // get from jwt
	var user = mongoose_user.follow(username, current);
	user.then(function(item){
		console.log(item);
		if (item){
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
