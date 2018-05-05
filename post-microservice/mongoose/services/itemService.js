var itemModel = require('../models/Item.js');

async function createItem(data) {
    var item = new itemModel(data);
    item.save(function(err){
        if (err) return err;
    });
    return item.id;
}

async function getAll() {
    return itemModel.find({});
}

async function getItem(id) {
    return itemModel.findOne({
        id: id
    });
}

async function deleteItem(id) {
    return itemModel.findOneAndRemove({_id: id},function(err){
        if (err) return err;
    });
}

async function searchItems(data) {
    var q = (data.q) ? {$search: data.q} : undefined;
    var following = (data.following) ? {$in: data.usersfollowed} : undefined;
    var parent = (data.parent != undefined) ? {$eq: data.parent} : undefined;
    var replies = (data.replies) ? undefined : {$not: {$ne: "reply"}};
    var hasMedia = (data.hasMedia) ? {$exists: data.hasMedia} : undefined;
    if (data.rank == "time"){
        query = {
            username: following,
            $text: q,
            timestamp: {'$lte': data.timestamp},
            parent: parent,
            childType: replies,
            'media.0': hasMedia
        }
        return itemModel.find(JSON.parse(JSON.stringify(query))).limit(data.limit).sort({timestamp: -1});
    } else {
        query = {
            username: following,
            $text: q,
            timestamp: {'$lte': data.timestamp},
            parent: parent,
            childType: replies,
            'media.0': hasMedia
        }
        return itemModel.find(JSON.parse(JSON.stringify(query))).limit(data.limit).sort({likes: -1, retweeted: -1});
    }

}

async function likeItem(data, elasticsearch){
    if (data.item.likedby.includes(data.user)){
        if (data.like){
            return "error"; //cannot like an item you already liked
        } else {
            try{
            elasticsearch.update({
                index: 'twitter',
                type: 'items',
                id: data.id,
                body:{
                    script: "ctx._source.likes-=1"
                }
            });
        }catch(err){

        }
            return itemModel.update({
                id: data.id
            }, {
                $pull: {
                    likedby: data.user
                },
                $inc: {
                    likes: -1
                }
            })
        }
    } else {
        if (data.like){
            try{
            elasticsearch.update({
                index: 'twitter',
                type: 'items',
                id: data.id,
                body:{
                    script: "ctx._source.likes+=1"
                }
            });
        }catch(err){

        }
            return itemModel.update({
                id: data.id
            }, {
                $addToSet: {
                    likedby: data.user
                },
                $inc: {
                    likes: 1
                }
            })
        } else {
            return "error"; //cannot unliked an item you didn't like
        }
    }
}


module.exports = {
    createItem,
    getItem,
    deleteItem,
    getAll,
    searchItems,
    likeItem
}
