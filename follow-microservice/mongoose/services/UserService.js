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
    if (limit) {
        return userModel.findOne({
            username: username
        }, {
            followers: {
                $slice: -(limit)
            }
        });
    } else {
        return userModel.findOne({
            username: username
        }, {
            followers: {
                $slice: -50
            }
        });
    }
}

async function getFollowing(username, limit) {
    if (limit) {
        return userModel.findOne({
            username: username
        }, {
            followers: {
                $slice: -(limit)
            }
        });
    } else {
        return userModel.findOne({
            username: username
        }, {
            followers: {
                $slice: -50
            }
        });
    }
}

// Note: username = user to follow, current = current user, follow = boolean
async function follow(username, current, follow) {
    var user = userModel.findOne({
        username: username
    });
    // var set = new Set(user.followers);
    // var hasUser = set.has(username);
    if (!follow) { //perform unfollow
        return userModel.update({
            "username": username
        }, {
            "$filter": {
                input: user.followers,
                as: "user",
                cond: {
                    "$$user": {
                        $ne: current
                    }
                }
            }
        }, function(err) {
            if (err) throw err;
        })
    } else { //perform follow
        userModel.findOneAndUpdate({
                username: username
            }, {
                $addToSet: {
                    "followers": current
                }
            },
            function(err, response) {
                if (err) {
                    return err;
                } else {
                    return response;
                }
            });
    }
}

async function updateFollower(data) {
    if (data.follow == false) {
        return userModel.update({
            username: data.followed
        }, {
            $pull: {
                followers: data.follower
            }
        });
    } else {
        return userModel.update({
            username: data.followed
        }, {
            $addToSet: {
                followers: data.follower
            }
        });
    }
}

async function updateFollowing(data) {
    if (data.follow == false) {
        return userModel.update({
            username: data.follower
        }, {
            $pull: {
                following: data.followed
            }
        });
    } else {
        return userModel.update({
            username: data.follower
        }, {
            $addToSet: {
                following: data.followed
            }
        });
    }
}




module.exports = {
    getUser,
    getAll,
    getFollowers,
    getFollowing,
    follow,
    updateFollower,
    updateFollowing
}
