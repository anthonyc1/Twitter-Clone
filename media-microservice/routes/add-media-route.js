var express = require('express'),
 bodyParser = require('body-parser'),
 jwt = require('jsonwebtoken'),
 multer = require('multer'),
 upload = multer({ dest: 'upload/'}),
 request = require('request'),
 fs = require('fs'),
 mongoose_media = require('../mongoose/services/mediaService.js');
var randomID = require("random-id");

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.post('/addmedia', upload.single('content'), async function(req, res){
	var file = req.file;
	var configVars = req.app.get('configVars');
    try {
    	var decoded = await jwt.verify((req.cookies.token), configVars.secret);
    	if (decoded){
    		fs.readFile(file.path, function read(err, data){
				if (err)
					throw error;
				else {
					var content = data.toString('base64');
                    var id = randomID(24);
					mongoose_media.createMedia({
                        id: id,
		    			username: decoded.username,
		    			name: file.originalname,
		    			contentType: file.mimetype,
		    			content: Buffer(content, 'base64')
		    		}).then(function(id){
-		    			res.send({status: "OK", id: id});
 		    		})
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
