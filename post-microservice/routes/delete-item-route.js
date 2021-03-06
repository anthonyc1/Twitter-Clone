var express = require('express'),
 bodyParser = require('body-parser'),
 mongoose = require('mongoose'),
 mongoose_item = require('../mongoose/services/itemService.js'),
 mongoose_media = require('../mongoose/services/mediaService.js');

var lifetime = 60;

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.delete('/item/:id', function(req, res){
	id = req.params.id;
	var key = "item"+id;
    var memcached = req.app.get('memcached');
	var item = mongoose_item.getItem(mongoose.Types.ObjectId(id));
	item.then(function(result){
		if (result){
			mongoose_item.deleteItem(mongoose.Types.ObjectId(id));

			var media = mongoose_media.deleteMedia(result.media);
			media.then(function(result){
				if (result){
					memcached.delete(key, function(err){
						console.log("delete");
					})
					res.sendStatus(200);
				} else {
					res.sendStatus(404);
				}
			}).catch(err => {
				console.log(err);
			})
		} else {
			res.sendStatus(404);
		}
	}).catch(err => {
		console.log(err);
	})
});

module.exports = router;
