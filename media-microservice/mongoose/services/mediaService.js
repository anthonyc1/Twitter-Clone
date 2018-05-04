var mediaModel = require('../models/Media.js');

async function createMedia(data) {
    var media = new mediaModel(data);
    media.save(function(err){
        if (err) return err;
    });
    return media.id;
}

async function getAll() {
    return mediaModel.find({});
}

async function getMedia(id) {
    return mediaModel.findOne({
        id: id
    });
}

module.exports = {
    createMedia,
    getAll,
    getMedia
}
