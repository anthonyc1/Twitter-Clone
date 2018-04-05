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

router.post('/search', async function(req, res) {
    var configVars = req.app.get('configVars');
    var following = [];
    var flag = true;
    if (req.body.following != false) {
        try {
            var decoded = await jwt.verify((req.cookies.token), configVars.secret);
            if (decoded) {
                var user = await mongoose_user.getFollowing(decoded.username, 100);
                following = user.following;
            } else {
                flag = false;
            }
        } catch (error) {
            console.log(error)
            flag = false;
        }
    }
    if (flag) {
        var timestamp = (req.body.timestamp) ? req.body.timestamp : new Date().getTime();
        var limit = (req.body.limit) ? req.body.limit : 25;
        following = (req.body.username) ? following.concat([req.body.username]): (following.length == 0) ? undefined : following;
        var items = mongoose_item.searchItems({
            timestamp: timestamp,
            limit: limit,
            q: req.body.q,
            following: following
        });
        items.then(function(items) {
            res.send({
                status: "OK",
                items: items
            });
        }).catch(err => {
            console.log(err);
            res.send({
                status: "error",
                error: err
            })
        })
    } else {
        res.send({
            status: "error"
        });
    }
});

module.exports = router;
