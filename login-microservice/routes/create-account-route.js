var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var userService = require('../mysql/services/userService');

var userService
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/', function(req, res){
    //userService.getUsers();
    res.send("hello");
});



module.exports = router;
