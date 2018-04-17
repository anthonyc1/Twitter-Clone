var express = require('express'),
 bodyParser = require('body-parser'),
 Memcached = require('memcached'),
 mongoose = require('mongoose'),
 mongoose_item = require('../mongoose/services/itemService.js');

var memcached = new Memcached('130.245.170.73:11211');
var lifetime = 60;

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/item/:id', function(req, res){
	id = req.params.id;
	var key = "item"+id;
	memcached.get(key, function(err, result){
		if (result != undefined){
			console.log("get: " + result);
			res.send(result);
		} else {
			var item = mongoose_item.getItem(mongoose.Types.ObjectId(id));
			item.then(function(item){
				console.log(item);
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
					})
					res.send(myObj)
				}
				 else {
					res.send({status: "error", error: "no item found"});
				}
			}).catch(err => {
				console.log(err);
			})
		}
	})
});

module.exports = router;
