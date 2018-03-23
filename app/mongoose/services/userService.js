var mongoose = require('mongoose');
var userModel = require('../models/User.js');


async function createUser(data) {
    var user = new userModel(data);
    return user.save();
}

async function getAll() {
    return userModel.find({});
}

async function getUser(username, email) {
    return userModel.findOne({
        username: username,
        email: email
    });
}

module.exports = {
    createUser,
    getUser,
    getAll
}
