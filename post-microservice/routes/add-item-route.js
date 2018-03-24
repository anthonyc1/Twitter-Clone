var express = require('express'),
 bodyParser = require('body-parser'),
 jwt = require('jsonwebtoken'),
 fs = require('fs'),
 mongoose = require('mongoose'),
 mongoose_item = require('../mongoose/services/addItemService.js');

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

let configVars = fs.readFileSync('./config_vars.json');
let obj = JSON.parse(configVars);
var secret = obj.secret;
var validContentTypes = [null, 'retweet','reply'];

router.post('/additem', function(req, res){
	var userJWT = jwt.verify(req.cookies.token, secret, function(err, decoded){
		if (err){
			res.send({status: "error", error: "invalid session"});
		} else {
			if (req.body.content == null || !(new Set(validContentTypes).has(req.body.childType)))
				res.send({status: "error", error: "unable to create user"});
			else {
				var item = mongoose_item.createItem({
					username: decoded.username,
					content: req.body.content,
					childType: req.body.childType,
					likes: 0,
					retweeted: 0,
					timestamp: Date.now()
				}).then(function(id){
					res.send({status: "OK", id: id});
				});
			}
		}
	})
});

module.exports = router;