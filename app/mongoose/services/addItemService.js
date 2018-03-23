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

module.exports = {
    createItem,
    getItem,
    getAll
}
