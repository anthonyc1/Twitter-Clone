var mongoose = require('mongoose');

const MediaSchema = mongoose.Schema({
    username: {type: String, required: true, lowercase: true},
    name: {type: String},
    contentType: {type: String, required: true},
    content: {type: Buffer, required: true}
});

module.exports = mongoose.model('Media', MediaSchema);
