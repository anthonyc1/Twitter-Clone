var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var userService = require('../mongoose/services/userService.js');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/', function(req, res) {
    res.render('index-tmpl', {
        pageID: 'index'
    });
});

// router.post('/createuser', async function(req, res) {
//     try {
//         let created = await userService.createUser(req.body);
//         if (!created) {
//             res.send({
//                 "Status": "ERROR"
//             });
//         } else {
//             res.send({
//                 "Status": "Success",
//                 "data": created
//             });
//         }
//     } catch (err) {
//         console.log(err);
//         res.send({
//             "Status": "ERROR"
//         });
//     }
// });

// router.get('/users', async function(req, res) {
//     try {
//         let users = await userService.getAll();
//         if (!users) {
//             res.send({
//                 "Status": "ERROR"
//             });
//         } else {
//             res.send({
//                 "Status": "Success",
//                 "data": users
//             });
//         }
//     } catch (err) {
//         console.log(err);
//         res.send({
//             "Status": "ERROR"
//         });
//     }
// });


// router.get('/user/:username', async function(req, res) {
//     try {
//         var user = await userService.getUser(req.params.username);
//         if (!user) {
//             res.send({
//                 "Status": "ERROR"
//             });
//         } else {
//             res.send({
//                 "Status": "Success",
//                 "data": user
//             });
//         }
//     } catch (err) {
//         console.log(err);
//         res.send({
//             "Status": "ERROR"
//         });
//     }
// });

module.exports = router;