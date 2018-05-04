var mediaModel = require('../models/Media.js');

async function deleteMedia(media) {
    return mediaModel.deleteMany({id: {$in: media}},function(err){
        if (err) return err;
    });
}

module.exports = {
    deleteMedia
}
