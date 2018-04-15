var express = require('express'),
 bodyParser = require('body-parser'),
 jwt = require('jsonwebtoken'),
 mongoose_media = require('../mongoose/services/mediaService.js');

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/media/:id', async function(req, res){
	var id = req.params.id;
	var configVars = req.app.get('configVars');
    try {
    	var decoded = await jwt.verify((req.cookies.token), configVars.secret);
    	if (decoded){
    		mongoose_media.getMedia(id).then(function(result){
    			if (result){
    				res.setHeader('content-type', result.contentType);
    				res.send(result.content);
    			} else {
    				res.send({status: "error", error: "no item found"});
    			}
    		})
    	} else {
    		res.send({status: "error", error: "invalid session"});
    	}
    } catch (error){
    	res.send({
            status: "error",
            error: error
        });
    }
})

module.exports = router;