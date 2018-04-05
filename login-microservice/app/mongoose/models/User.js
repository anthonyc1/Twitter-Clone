var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {type: String, required: true, lowercase: true},
    email: {type: String, required: true},
    followers: {type: Array, "default":[]},
    following: {type: Array, "default":[]}
});

module.exports = mongoose.model('User', UserSchema);
