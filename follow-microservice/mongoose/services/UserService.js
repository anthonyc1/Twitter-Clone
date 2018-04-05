var userModel = require('../models/User.js');

async function getAll() {
    return userModel.find({});
}

async function getUser(username) {
    return userModel.findOne({
        username: username
    });
}

async function getFollowers(username, limit) {
    if (limit){
        return userModel.findOne(
        {username: username}, {followers : { $slice : -(limit) }});
    } else {
        return userModel.findOne(
        {username: username}, {followers : { $slice : -50 }});
    }
}

async function getFollowing(username, limit) {
    if (limit){
        return userModel.findOne(
        {username: username}, {followers : { $slice : -(limit) }});
    } else {
        return userModel.findOne(
        {username: username}, {followers : { $slice : -50 }});
    }
}

// Note: username = user to follow, current = current user
async function follow(username, current){
    var user = userModel.findOne({username: username});
    var set = new Set(user.followers);
    var hasUser = set.has(username);        
    if (hasUser){ //perform unfollow
        return userModel.update({
            {"username" : username},
            {"$filter" : {
                input: followers,
                as: "user",
                cond: {"$$user" !== current}
            }}, function (err) {
                if (err) throw err;
            }
        })
    } else { //perform follow
        return userModel.update({
            {"username" : username},
            {"$push": {"followers" : current}},
            function(err){
                if (err) throw err;
            }
        })
    }
}

module.exports = {
    getUser,
    getAll,
    getFollowers,
    getFollowing,
    follow
}
