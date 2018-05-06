var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    mongoose_user = require('../mongoose/services/UserService.js');
var jwt = require('jsonwebtoken');


var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.post('/follow', async function(req, res) {
    var configVars = req.app.get('configVars');
    try {
        var decoded = await jwt.verify((req.cookies.token), configVars.secret);
        if (decoded) {
            var followed = req.body.username.toLowerCase();
            var follower = decoded.username.toLowerCase();
            if (followed == follower) {
                res.send({
                    status: "error",
                    error: "can't follow yourself"
                });
            } else {
                let response = await mongoose_user.updateFollower({
                    followed: followed,
                    follower: follower,
                    follow: req.body.follow
                });
                if (response.n == 1) {
                    mongoose_user.updateFollowing({
                        followed: followed,
                        follower: follower,
                        follow: req.body.follow
                    }).then(function(err){
                        res.send({
                            status: "OK"
                        });
                    })
                } else {
                    res.send({
                        status: "error",
                        error: "user does not exist"
                    });
                }
            }
        } else {
            res.send({
                status: "error"
            });
        }
    } catch (error) {
        res.send({
            status: "error",
            error: error
        });
    }
});

module.exports = router;
