var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {type: String, required: true, index:{unique: true}, lowercase: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    key: {type: Number, required: true}
});

module.exports = mongoose.model('User', UserSchema);
