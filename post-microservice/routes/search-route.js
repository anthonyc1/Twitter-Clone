var express = require('express'),
    bodyParser = require('body-parser'),
    Memcached = require('memcached'),
    mongoose = require('mongoose'),
    mongoose_item = require('../mongoose/services/itemService.js'),
    mongoose_user = require('../mongoose/services/userService.js');;
var jwt = require('jsonwebtoken');
var itemModel = require('../mongoose/models/Item.js');
var sortBy = require('sort-by');


var memcached = new Memcached('130.245.170.73:11211');
var lifetime = 600;

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.post('/search', async function(req, res) {
    var elasticsearch = req.app.get('elasticsearch');
    var configVars = req.app.get('configVars');
    var usersfollowed = [];
    var flag = true;
    var following = (!req.body.following) ? req.body.following : true;
    if (following != false) {
        try {
            var decoded = await jwt.verify((req.cookies.token), configVars.secret);
            if (decoded) {
                var user = await mongoose_user.getFollowing(decoded.username, 100);
                usersfollowed = user.following;
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
        usersfollowed = (req.body.username) ? usersfollowed.concat([req.body.username]): (usersfollowed.length == 0) ? undefined : usersfollowed;
        var rank = (req.body.rank) ? req.body.rank : "interest";
        var parent = req.body.parent;
        var replies = (req.body.replies != undefined) ? req.body.replies : true;
        var hasMedia = (req.body.hasMedia != undefined) ? req.body.hasMedia : false;
        try{
        var index;
        var obj = {}
        obj = {};
        obj.size = limit;
        obj.query = {};
        obj.query.bool = {};
        if(req.body.q){
            obj.query.bool.must = [];
            obj.query.bool.must[0] = {match: {content: req.body.q}};
        }
        obj.query.bool.filter = [];
        obj.query.bool.filter[0] = { range: { timestamp: { lte: timestamp }}};
        (parent) ? (obj.query.bool.filter[1] = {match: {username: parent}}): "";
        index = obj.query.bool.filter.length;
        (hasMedia) ? (obj.query.bool.filter[index] = {exists: {field: media}}): "";
        index = obj.query.bool.filter.length;
        (usersfollowed && following) ? (obj.query.bool.filter[index] = {terms: {["username.keyword"]: usersfollowed}}): "";
        if(!replies){
            obj.query.bool.must_not = [];
            obj.query.bool.must_not[0] = {exists: {field: childType}};
        }
        var resp = await itemModel.esSearch(obj, {hydrate: {docsOnly: true}})
        if(rank == "interest"){
            resp.sort(sortBy('-likes'));
        }else{
            resp.sort(sortBy('-timestamp'));
        }
     res.send({
        status: "OK",
        items: resp
    });
}catch(error){
    console.log(error)
    res.send({
        status: "error"
    });
}
    } else {
        res.send({
            status: "error"
        });
    }
});

module.exports = router;
