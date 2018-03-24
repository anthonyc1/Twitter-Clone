var mongoose = require('mongoose');
var itemModel = require('../models/AddItem.js');


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
    return itemModel.find({
        timestamp: {'$lte': data.timestamp}
    }).sort({ field: 'asc', _id: -1 }).limit(data.limit);
}

module.exports = {
    createItem,
    getItem,
    deleteItem,
    getAll,
    searchItems
}
