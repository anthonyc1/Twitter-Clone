var express = require('express'),
 bodyParser = require('body-parser'),
 mongoose = require('mongoose'),
 mongoose_item = require('../mongoose/services/itemService.js');

var lifetime = 60;

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
	extended: false
}));

router.get('/item/:id', async function(req, res){
	let id = req.params.id;
	var key = "item"+id;
    var memcached = req.app.get('memcached');
	var result = await getMemCache(key, memcached);
	if (result != undefined){
		res.send(result);
	} else {
        try{
		    var item = await mongoose_item.getItem(id);
        }catch(err){
            res.send({status: "error", error: "no item found"});
        }
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
				});
				res.send(myObj);
		}else {
			res.send({status: "error", error: "no item found"});
		}
	}
});

function getMemCache(key, memcached){
    return new Promise(function(resolve,reject){
         memcached.get(key,function(err,data){
           resolve(data);
         });
    });
}

module.exports = router;
