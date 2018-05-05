var express = require('express'),
    bodyParser = require('body-parser'),
    Memcached = require('memcached'),
    mongoose = require('mongoose'),
    mongoose_item = require('../mongoose/services/itemService.js'),
    mongoose_user = require('../mongoose/services/userService.js');;
var jwt = require('jsonwebtoken');

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
        var items = await mongoose_item.searchItems({
            timestamp: timestamp,
            limit: limit,
            q: req.body.q,
            following: following,
            usersfollowed: usersfollowed,
            rank: rank,
            parent: parent,
            replies: replies,
            hasMedia: hasMedia
        });
        var index;
        var query = {};
        query.size = limit;
        query.index = 'twitter';
        query.type = 'items';
        query.body = {};
        (rank == "interest") ? (query.body.sort = { "likes" : "desc" }) : (query.body.sort = { "timestamp" : {"order" : "desc"}});
        query.body.query = {};
        query.body.query.bool = {};
        query.body.query.bool.must = [];
        query.body.query.bool.must[0] = {match: {content: req.body.q}};
        (usersfollowed && following) ? (query.body.query.bool.must[1] = {terms: {username: usersfollowed}}): "";
        query.body.query.bool.filter = [];
        query.body.query.bool.filter[0] = { range: { timestamp: { lte: timestamp }}};
        (parent) ? (query.body.query.bool.filter[1] = {match: {username: parent}}): "";
        index = query.body.query.bool.filter.length;
        (hasMedia) ? (query.body.query.bool.filter[index] = {exists: {field: media}}): "";
        if(!replies){
            query.body.query.bool.must_not = [];
            query.body.query.bool.must_not[0] = {exists: {field: childType}};
        }
        var resp = await elasticsearch.search(query);
        var items = [];
        for(let i = 0; i < resp.hits.hits.length; i++){
            items.push(resp.hits.hits[i]._source);
        }
    res.send({
        status: "OK",
        items: items
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
