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
	var configVars = req.app.get('configVars');
	var userJWT = jwt.verify(req.cookies.token, configVars.secret, function(err, decoded){
		if (err){
			res.send({status: "error", error: "invalid session"});
		} else {
			username = req.params.username;
			current = decoded.username;
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
		}
	})
});

module.exports = router;
