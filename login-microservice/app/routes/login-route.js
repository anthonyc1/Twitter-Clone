'login-route.js'
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));


router.post('/login', async function(req, res) {
    var configFile = req.app.get('appConfig');
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
            let login = await service.getUser(req.body.username);
            if (!login) {
                res.send(JSON.stringify({
                    "status": 'error',
                    "error": "username",
                    "errorMessage": "incorrect username"
                }));
            } else {
                //if (!(bcrypt.compareSync(req.body.password, login.password))) {
                if(req.body.password != login.password){
                    res.send(JSON.stringify({
                        "status": 'error',
                        "error": "password",
                        "errorMessage": "incorrect password"
                    }));
                } else if (login.active == false) {
                    res.send(JSON.stringify({
                        "status": 'error',
                        "error": "username",
                        "errorMessage": "account is inactive"
                    }));
                } else {
                    var jwtPayload = {
                        username: req.body.username,
                        id: login.user_id,
                        email: login.email,
                        hash: login.hash
                    }
                    var authJwtToken = jwt.sign(jwtPayload, configFile.secret)
                    res.cookie('token', authJwtToken, {
                        expires: new Date(Date.now() + 9000000)
                    });
                    res.send(JSON.stringify({
                        "status": 'OK'
                    }));
                }
            }
        }
    } catch (err) {
        console.log(err)
        res.send({
            "status": 'error',
            "errro": err
        });
    }
});

router.post('/logout', async function(req, res) {
    res.clearCookie('token');
    res.send(JSON.stringify({
        "status": 'OK'
    }));
});

router.get('/logout', async function(req, res) {
    res.clearCookie('token');
    res.redirect("/");
});

async function verifyInput(body, response) {
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
        if (body.password.length < 4) {
            flag = false;
            log.type = "error";
            log.code = 1;
            log.shortMessage = "password";
            log.longMessage = "password must have minimum of 4 characters";
        }
    }
    return flag;
}

function Log(type, code, shortMessage, longMessage) {
    this.type = type;
    this.code = code;
    this.shortMessage = shortMessage;
    this.longMessage = longMessage;
}


module.exports = router;
