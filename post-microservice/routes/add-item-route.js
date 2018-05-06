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

var validContentTypes = [undefined, 'retweet', 'reply'];

router.post('/additem', async function(req, res) {
    var configVars = req.app.get('configVars');
    var elasticsearch = req.app.get('elasticsearch');
    try {
        var decoded = await jwt.verify((req.cookies.token), configVars.secret);
        if (decoded) {
            if (req.body.content == null || !(new Set(validContentTypes).has(req.body.childType)))
                res.send({
                    status: "error",
                    error: "unable to create user"
                });
            else {
                var id = randomID(24);
                var parent = (req.body.parent) ? req.body.parent : "";
                var media = (req.body.media) ? req.body.media : [];
                item = {
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
                }
                mongoose_item.createItem(item);
                res.send({
                    status: "OK",
                    id: id
                });
            }
        } else {
            res.send({
                status: "error",
                error: "invalid session"
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
