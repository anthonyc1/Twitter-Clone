var mongoose = require('mongoose');
var mexp = require('mongoose-elasticsearch-xp');
const ItemSchema = mongoose.Schema({
    username: {type: String, required: true, lowercase: true},
    content: {type: String, required: true},
    childType: {type: String},
    likes: {type: Number, required: true},
    retweeted: {type: Number, required: true},
    timestamp: {type: String, required: true},
    parent: {type: String},
    media: {type: Array, "default":[]},
    likedby: {type: Array, "default":[]}
});

ItemSchema.plugin(mexp,
    {
        host:'130.245.170.74',
        port: 9200,
        index: "twitter",
        type: "items"
    });

module.exports = mongoose.model('Item', ItemSchema);
