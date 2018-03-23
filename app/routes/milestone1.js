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

function generateKey(){
	var num = Math.floor(Math.random()*10000);
	if (num < 1000){ num *= 10; }
	return num;
}

router.post('/adduser', function(req, res){
	// u = req.body.username;
	// p = req.body.password;
	// e = req.body.email;

	// var user = mongoose.getUser(u);
	// if (user == null){
	// 	var key = generateKey();
	// 	mongoose.createUser({
	// 		username: u,
	// 		password: p,
	// 		email: e,
	// 		key: key
	// 	});
	// 	res.send({status: "OK"});
	// } else {
	// 	res.send({status: "error", error:"user already exists"});
	// }
});

router.post('/login', function(req, res){
	username = req.body.username;
	password = req.body.password;
});

router.post('/logout', function(req, res){

});

router.post('/verify', function(req, res){
	email = req.body.email;
	key = req.body.key;

});

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

router.post('/search', function(req, res){
	timestamp = req.body.timestamp;
	limit = req.body.limit;
});

module.exports = router;