var userModel = require('../models/User.js');

async function createUser(data) {
    var item = new itemModel(data);
    item.save(function(err){
        if (err) return err;
    });
    return item._id;
}

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
        {username: username}, {followers : { $slice : -limit }});
    } else {
        return userModel.findOne(
        {username: username}, {followers : { $slice : -50 }});
    }
}

async function follow(username){

}

module.exports = {
    createUser,
    getUser,
    getAll
}
