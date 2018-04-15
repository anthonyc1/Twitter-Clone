var express = require('express'),
 bodyParser = require('body-parser'),
 jwt = require('jsonwebtoken');

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.post('/addmedia', async function(req, res){

})

module.exports = router;