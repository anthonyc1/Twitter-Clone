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
    updateFollower,
    updateFollowing
}
