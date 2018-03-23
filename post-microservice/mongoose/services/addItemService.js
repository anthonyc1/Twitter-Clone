var mongoose = require('mongoose');
var addItemModel = require('../models/AddItem.js');


async function createItem(data) {
    var item = new addItemModel(data);
    return item.save();
}

async function getAll() {
    return addItemModel.find({});
}

async function getItem(id) {
    return addItemModel.findOne({
        id: id
    });
}

async function searchItems(data) {
    return addItemModel.find({
        timestamp: {'$lte': data.timestamp}
    }).sort({ field: 'asc', _id: -1 }).limit(data.limit);
}

module.exports = {
    createItem,
    getItem,
    getAll,
    searchItems
}
