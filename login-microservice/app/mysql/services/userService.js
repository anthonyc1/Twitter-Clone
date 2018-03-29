var Models = require('../models/index');

var client_service = null;
var models = null;

async function createUser(user) {
    return models.User.findOrCreate({
        where: {
            username: user.username
        },
        defaults: {
            email: user.email,
            password: user.password
        }
    });
}

async function getUser(username) {
    return models.User.findOne({
        where: {
            username: username
        }
    });
}

async function activateAccount(email) {
    return models.User.update({
        active: true,
    }, {
        where: {
            email: email
        }
    });
}

async function activateAccountByKey(key) {
    return models.User.update({
        active: true,
    }, {
        where: {
            user_id: key
        }
    });
}

module.exports = (client) => {
    models = Models(client);
    client_service = client;
    return {
        createUser,
        getUser,
        activateAccount,
        activateAccountByKey
    };
};
