var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.get(['/'], async function(req, res) {
    res.render('index-tmpl', {
        pageID: 'index',
        title: "Food Enlightenment"
    });
});

module.exports = router;
