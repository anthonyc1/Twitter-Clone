var express = require('express'),
 bodyParser = require('body-parser'),
 Memcached = require('memcached'),
 mongoose = require('mongoose'),
 mongoose_item = require('../mongoose/services/itemService.js');

var memcached = new Memcached('130.245.170.73:11211');
var lifetime = 600;

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
	extended: false
}));

router.get('/item/:id', async function(req, res){
	let id = req.params.id;
	var key = "item"+id;
	var result = await getMemCache(key);
	console.log("cache: " + result);
	if (result != undefined){
		console.log("cache: " + result);
		res.send(result);
	} else {
		console.log(id);
		var item = await mongoose_item.getItem(id);
		console.log("mongo: " + item);
		if (item){
			var myObj = {status: "OK", item: {
				id: id,
				username: item.username,
				property:{
					likes: item.likes
				},
				retweeted: item.retweeted,
				content: item.content,
				timestamp: item.timestamp,
				childType: (item.childType) ? item.childType : null,
				parent: (item.parent) ? item.parent : "",
				media: item.media
				}};
				memcached.set(key, myObj, lifetime, function(err, result){
					if (err) throw err;
					console.log("set: " + result);
				});
				res.send(myObj);
		}else {
			res.send({status: "error", error: "no item found"});
		}
	}
});

function getMemCache(key){
    return new Promise(function(resolve,reject){
         memcached.get(key,function(err,data){
           resolve(data);
         });
    });
}

module.exports = router;
