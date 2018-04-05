var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var kafka = require('../kafka/kafkaService');
var bcrypt = require('bcrypt');
var userService = require('../mongoose/services/userService.js');
const saltRounds = 10;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.post('/verify', async function(req, res) {
    var service = req.app.get('userService');
    var verified;
    try {
        if (req.body.key == "abracadabra") {
            verified = await service.activateAccount(req.body.email);
        } else {
            verified = await service.activateAccountByKey((req.body.key).substring(10));
        }
        if (verified != 0) {
            res.send(JSON.stringify({
                "status": 'OK'
            }));
        } else {
            res.send(JSON.stringify({
                "status": 'error',
                "error": 'Invalid key',
            }));
        }
    } catch (err) {
        console.log(err)
        res.send(JSON.stringify({
            "status": 'error',
            "error": err
        }));
    }
});

router.get('/verify/:email/:key', async function(req, res) {
    var service = req.app.get('userService');
    try {
        var verified;
        if (req.body.key == "abracadabra") {
            verified = await service.activateAccount(req.params.email);
        } else {
            verified = await service.activateAccountByKey(req.params.key);
        }
        if (verified) {
            res.send(JSON.stringify({
                "status": 'OK'
            }));
        } else {
            res.send(JSON.stringify({
                "status": 'error',
                "error": 'Invalid email'

            }));
        }
    } catch (err) {
        console.log(err)
        res.send(JSON.stringify({
            "status": 'error',
            "error": err
        }));
    }
});

router.post('/adduser', async function(req, res) {
    var log = new Log();
    var service = req.app.get('userService');
    try {
        if ((await verifyInput(req.body, log)) == false) {
            res.send(JSON.stringify({
                "status": log.type,
                "error": log.shortMessage,
                "errorMessage": log.longMessage
            }));
        } else {
            //removed hash to increase speed
            //var salt = bcrypt.genSaltSync(saltRounds);
            //var hash = bcrypt.hashSync(req.body.password, salt);
            let created = await service.createUser({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            if (created[1]) {
                let createdMongo = userService.createUser({
                    email: req.body.email,
                    username: req.body.username
                });
                kafka.sendEmail(JSON.stringify({
                    username: req.body.username,
                    email: req.body.email,
                    key: created[0].dataValues.user_id
                }));
                res.send(JSON.stringify({
                    "status": "OK"
                }));
            } else {
                //user with unsername already exists in the database
                res.send(JSON.stringify({
                    "status": "error",
                    "error": "username",
                    "errorMessage": "username already exists"
                }));
            }
        }
    } catch (error) {
        //user with email already exists in the database
        if (error.errors[0] != undefined) {
            res.send(JSON.stringify({
                "status": "error",
                "error": "email",
                "errorMessage": "email already exists"
            }));
        } else {
            //probably log this error
            console.log(error);
            res.send(JSON.stringify({
                "status": "error",
                "error": "Unable to create account"
            }));
        }
    }
});

async function verifyInput(body, log) {
    var flag = true;
    if (flag == true) {
        if (body.username.length < 1) {
            flag = false;
            log.type = "error";
            log.code = 1;
            log.shortMessage = "username";
            log.longMessage = "please enter a valid username";
        }
    }
    if (flag == true) {
        if (!validateEmail(body.email)) {
            flag = false;
            log.type = "error";
            log.code = 1;
            log.shortMessage = "email";
            log.longMessage = "please enter a valid email";
        }
    }
    if (flag == true) {
        if (body.password.length < 4) {
            flag = false;
            log.type = "error";
            log.code = 1;
            log.shortMessage = "password";
            log.longMessage = "password must have minimum of 4 characters";
        }
    }
    if (flag == true) {
        if (body.password !== body.password) {
            flag = false;
            log.type = "error";
            log.code = 1;
            log.shortMessage = "confirmPassword";
            log.longMessage = "These passwords don't match.";
        }
    }
    return flag;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function Log(type, code, shortMessage, longMessage) {
    this.type = type;
    this.code = code;
    this.shortMessage = shortMessage;
    this.longMessage = longMessage;
}


module.exports = router;
