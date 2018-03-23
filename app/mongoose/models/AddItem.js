var mongoose = require('mongoose');

const AddItemSchema = mongoose.Schema({
    username: {type: String, required: true, lowercase: true},
    content: {type: String, required: true},
    childType: {type: String, required: true},
    likes: {type: Number, required: true},
    retweets: {type: String, required: true},
    timestamp: {type: String, required: true},
    id: {type: mongoose.Schema.Types.ObjectId, required: true, index:{unique: true}}
});

module.exports = mongoose.model('Item', AddItemSchema);