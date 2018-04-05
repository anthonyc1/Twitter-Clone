var itemModel = require('../models/Item.js');


async function createItem(data) {
    var item = new itemModel(data);
    item.save(function(err){
        if (err) return err;
    });
    return item._id;
}

async function getAll() {
    return itemModel.find({});
}

async function getItem(id) {
    return itemModel.findOne({
        _id: id
    });
}

async function deleteItem(id) {
    return itemModel.findOneAndRemove({_id: id},function(err){
        if (err) return err;
    });
}

async function searchItems(data) {
    var q = (data.q) ? {$search: data.q} : undefined;
    var following = (data.following) ? {$in: data.following} : undefined;
    query = {
        username: following,
        $text: q,
        timestamp: {'$lte': data.timestamp}
    }
    return itemModel.find(JSON.parse(JSON.stringify(query))).limit(data.limit);
}


module.exports = {
    createItem,
    getItem,
    deleteItem,
    getAll,
    searchItems
}
