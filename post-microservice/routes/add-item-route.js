var express = require('express'),
 bodyParser = require('body-parser'),
 mongoose = require('mongoose'),
 mongoose_item = require('../mongoose/services/itemService.js');
var jwt = require('jsonwebtoken');
var randomID = require("random-id");
var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

var validContentTypes = [undefined, 'retweet','reply'];

router.post('/additem', async function(req, res){
    var configVars = req.app.get('configVars');
    try {
    	var decoded = await jwt.verify((req.cookies.token), configVars.secret);
    	if (decoded){
			if (req.body.content == null || !(new Set(validContentTypes).has(req.body.childType)))
				res.send({status: "error", error: "unable to create user"});
			else {
                var id = randomID(24);
				var parent = (req.body.parent) ? req.body.parent : "";
				var media = (req.body.media) ? req.body.media : [];
				mongoose_item.createItem({
                    id: id,
					username: decoded.username,
					content: req.body.content,
					childType: req.body.childType,
					likes: 0,
					retweeted: 0,
					timestamp: Date.now(),
					parent: parent,
					media: media,
					likedby: []
<<<<<<< HEAD
				});
                console.log("hello")
                res.send({status: "OK", id: id});
=======
				}).then(function(id){
-					res.send({status: "OK", id: id});
 				});
>>>>>>> 4f008f3f4ced1af2d29a6fbd39fb875ea346a46f
			}
		} else {
			res.send({status: "error", error: "invalid session"});
		}
    } catch (error){
    	res.send({
            status: "error",
            error: error
        });
    }
});

module.exports = router;
