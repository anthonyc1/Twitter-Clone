var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    mongoose_item = require('../mongoose/services/itemService.js'),
    mongoose_user = require('../mongoose/services/userService.js');;
var jwt = require('jsonwebtoken');

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.post('/item/:id/like', async function(req, res){
	var configVars = req.app.get('configVars');
    try {
        var decoded = await jwt.verify((req.cookies.token), configVars.secret);
        if (decoded) {
        	var user = decoded.username;
        	var id = req.params.id;
            var like;
            if(req.body.like == undefined){
                like = true;
            }else{
                like = req.body.like;
            }
			var item = mongoose_item.getItem(id);
			item.then(function(result){
				if (result){
					mongoose_item.likeItem({
						item: result,
						user: user,
						id: result.id,
						like: like
					});
                    console.log(item)
                    res.send({status: "OK"})
				} else {
					// no item found with that id
					res.send({status: "error"});
				}
			})
		}
	} catch (error) {
		res.send({
            status: "error",
            error: error
        });
	}
})

module.exports = router;
