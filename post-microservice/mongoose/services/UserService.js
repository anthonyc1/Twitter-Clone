var userModel = require('../models/User.js');

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


module.exports = {
    getFollowing
}
