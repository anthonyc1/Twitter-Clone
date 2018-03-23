var Models = require('../models/index');

var client = null;
var models = null;

async function getUsers(){
    // db.query("select * from user", null, function (data, error) {
    //     console.log(error);
    //     console.log(data);
    // });
}

module.exports = (_client) => {
    models = Models(_client);
    client = _client;
    return {};
};
