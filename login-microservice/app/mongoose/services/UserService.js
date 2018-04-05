var userModel = require('../models/User.js');

async function createUser(data) {
    var user = new userModel(data);
    return user.save();
}

module.exports = {
    createUser
}
